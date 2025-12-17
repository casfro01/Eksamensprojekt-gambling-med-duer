export function convertDateStringToPrettyString(date: string | null): string{
    console.log(date)
    const dat = new Date(date != null ? date : "");

    return new Intl.DateTimeFormat('da-DK', {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(dat);
    //return new Date(date != null ? date : "").toLocaleDateString('da-DK')
}