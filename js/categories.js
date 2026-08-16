/* categories.js — Kategorie-Verwaltung. Kategorien sind NICHT hartkodiert im UI,
   sondern liegen in der DB (Object Store "categories") und werden von dort geladen.
   DEFAULT_CATEGORIES dient nur als Erstbefüllung beim allerersten Start. */

const DEFAULT_CATEGORIES = [
  { id: "alltag", name: "Alltag", emoji: "🗣️", custom: false },
  { id: "auto", name: "Auto", emoji: "🚗", custom: false },
  { id: "kueche", name: "Küche / Essen", emoji: "🍳", custom: false },
  { id: "landwirtschaft", name: "Landwirtschaft", emoji: "🚜", custom: false },
  { id: "werkzeuge", name: "Werkzeuge / Technik", emoji: "🔧", custom: false },
  { id: "reisen", name: "Reisen", emoji: "✈️", custom: false },
  { id: "haushalt", name: "Haushalt", emoji: "🏠", custom: false },
  { id: "arbeit", name: "Arbeit", emoji: "💼", custom: false },
];

const Categories = {
  async all() {
    const list = await DB.getAll("categories");
    return list.sort((a, b) => a.name.localeCompare(b.name, "de"));
  },

  async byId(id) {
    return DB.get("categories", id);
  },

  slugify(name) {
    return (
      name
        .trim()
        .toLowerCase()
        .replace(/[äöüß]/g, (ch) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" }[ch]))
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "kategorie-" + Date.now()
    );
  },

  async create(name, emoji) {
    const id = this.slugify(name);
    const existing = await DB.get("categories", id);
    if (existing) throw new Error("Diese Kategorie existiert bereits.");
    const category = { id, name: name.trim(), emoji: emoji || "📚", custom: true };
    await DB.put("categories", category);
    return category;
  },

  async update(id, fields) {
    const category = await DB.get("categories", id);
    if (!category) throw new Error("Kategorie nicht gefunden.");
    Object.assign(category, fields);
    await DB.put("categories", category);
    return category;
  },

  async remove(id) {
    const cardsInCategory = await DB.getByIndex("cards", "category", id);
    if (cardsInCategory.length > 0) {
      throw new Error(
        `Diese Kategorie enthält noch ${cardsInCategory.length} Lernkarte(n) und kann nicht gelöscht werden.`
      );
    }
    await DB.delete("categories", id);
  },

  async cardCount(id) {
    const cards = await DB.getByIndex("cards", "category", id);
    return cards.length;
  },
};
