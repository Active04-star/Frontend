import { ISportCenter } from "./SportCenter_Interface"; // Relación con la interfaz ISportCenter
import { IField } from "./field_Interface"; // Relación con la interfaz IField

export interface IImage {
  id: string;
  imageUrl: string; // Convertido a camelCase para seguir las convenciones del frontend
  sportcenter?: ISportCenter; // Relación con ISportCenter (opcional)
  field?: IField; // Relación con IField (opcional)
}
