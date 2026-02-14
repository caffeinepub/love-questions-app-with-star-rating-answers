import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Answer {
    textAnswer: string;
    timestamp: bigint;
    questionId: string;
}
export interface backendInterface {
    getAllAnswers(): Promise<Array<Answer>>;
    saveAnswer(id: string, questionId: string, textAnswer: string, timestamp: bigint): Promise<void>;
}
