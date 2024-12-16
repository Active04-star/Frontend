import { ISportCenter } from "@/interfaces/SportCenter_Interface";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getComplexesDB(): Promise<ISportCenter[]> {
  try {
    const res = await fetch(`${APIURL}/`);
    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
    const complexes: ISportCenter[] = await res.json();
    return complexes;
  } catch (error: any) {
    throw new Error(`Failed to fetch complexes: ${error.message}`);
  }
}


  
export async function getcomplexesById(id: string): Promise<ISportCenter> {
  try {
    const complexes = await getComplexesDB();
    const complex = complexes.find((item) => item.id === id);
    if (!complex) throw new Error(`Complex with ID ${id} not found`);
    return complex;
  } catch (error: any) {
    throw new Error(`Failed to fetch complex by ID: ${error.message}`);
  }
}
