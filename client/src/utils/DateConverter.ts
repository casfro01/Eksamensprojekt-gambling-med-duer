export function convertDateStringToPrettyString(date: string | undefined): string{
    console.log(date)
    const dat = new Date(date != undefined ? date : "1999-01-01");

    return new Intl.DateTimeFormat('da-DK', {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(dat);
    //return new Date(date != null ? date : "").toLocaleDateString('da-DK')
}