import { API_URL } from "@/config/config"

export function getSubPath(path: string): string {
    let start = 0;
    const end = path.length;
    if(API_URL) {
        start = API_URL?.length;
    }

    return path.slice(start, end);
}