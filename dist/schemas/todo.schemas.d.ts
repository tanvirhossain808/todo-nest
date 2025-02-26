import { Document } from 'mongoose';
export declare class Todo extends Document {
    title: string;
    description: string;
    completed: boolean;
    user: string;
}
export declare const TodoSchema: import("mongoose").Schema<Todo, import("mongoose").Model<Todo, any, any, any, Document<unknown, any, Todo> & Todo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Todo, Document<unknown, {}, import("mongoose").FlatRecord<Todo>> & import("mongoose").FlatRecord<Todo> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
