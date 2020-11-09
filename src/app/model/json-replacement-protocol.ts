export default interface JsonReplacementProtocol{
    result: string;
    replacements: {componentIdx: number,
                   replaceWith: string}[];
}