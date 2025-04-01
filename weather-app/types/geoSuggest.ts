interface Highlight {
    begin: number;
    end: number;
}

interface Title {
    text: string;
    hl?: Highlight[];
}

interface Subtitle {
    text: string;
}

interface Distance {
    value: number;
    text: string;
}

interface GeoSuggestResult {
    title: Title;
    subtitle?: Subtitle;
    tags: string[];
    distance?: Distance;
}

export interface GeoSuggestResponse {
    suggest_reqid: string;
    results: GeoSuggestResult[];
}
