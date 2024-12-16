interface SearchTitle {
    id: string;
    imageType: string;
    titleNameText: string;
    titlePosterImageModel: TitleImageModel;
    titleReleaseText: string;
    titleTypeText: string;
    topCredits: string[];
}
type TitleImageModel = {
    url: string,
    maxHeight: number,
    maxWidth: number,
    caption: string
}
interface TitleDetails{
      title: string;
                    description: string;
                    releaseYear: number;
                    poster?: string;
                    runtime?: number;
                    genres?: string[];
                    rating?: number;
                    videos?: Array<{node: {
                id: string;
                name: {
                    value: string;
                };
                description?: {
                    value: string;
                };
                thumbnail: {
                    url: string;
                    width: number;
                    height: number;
                };
                runtime: {
                    value: number;  // in seconds
                };
                playbackURLs: Array<{
                    displayName: {
                        value: string;  // e.g., "480p", "SD"
                    };
                    url: string;
                    videoDefinition: string;
                }>;
            }}>;
}
type TitleSchema = {
    id: number
    title: string
    imdbTitleId: string
    poster: string
    rating: number
    watched?: boolean
    createdAt?: string
    updatedAt?: string
}
interface MovieDetails {
    id: string;
    titleText: {
        text: string;
    };

    plot: {
        plotText: {
            plainText: string;
        };
    };
    releaseYear: {
        year: number;
    };
    runtime: {
        seconds: number;
    };
    ratingsSummary: {
        aggregateRating: number;
        voteCount: number;
    };
    genres: {
        genres: Array<{
            text: string;
            id: string;
        }>;
    };
    primaryImage: {
        url: string;
        width: number;
        height: number;
    };
    certificate: {
        rating: string;
    };
    principalCredits: Array<{
        category: {
            text: string;
            id: string;
        };
        credits: Array<{
            name: {
                nameText: {
                    text: string;
                };
                id: string;
            };
        }>;
    }>;
    countriesOfOrigin: {
        countries: Array<{
            id: string;
            text: string;
        }>;
    };
    metacritic?: {
        metascore: {
            score: number;
        };
    };
    primaryVideos?: {
        edges: Array<{
            node: {
                id: string;
                name: {
                    value: string;
                };
                description?: {
                    value: string;
                };
                thumbnail: {
                    url: string;
                    width: number;
                    height: number;
                };
                runtime: {
                    value: number;  // in seconds
                };
                playbackURLs: Array<{
                    displayName: {
                        value: string;  // e.g., "480p", "SD"
                    };
                    url: string;
                    videoDefinition: string;
                }>;
            };
        }>;
    };
}