export function date2text(date: Date): string {
    const formatter = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return formatter.format(date);
}

export function textFormat(date: Date): string {
    const formatter = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });
    return formatter.format(date);
}