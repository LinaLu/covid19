
type Gender = "Male" | "Female" 

export type GenderOptions = Array<{value: string, label: Gender}>

export interface FormInput {
    age: number
    height: number
    weight: number
    gender: string   
    neumonia: boolean 
}
