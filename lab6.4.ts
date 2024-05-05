type User = {
    id: string;
    name: string;
}

type Role = "student" | "teacher"

type Rate =  1 | 2 | 3 | 4 | 5

type Level =  "junior" | "middle" | "senior"

type Course = {
    id: number;
    title: string;
    role: Role;
    rate: Rate;
    level: Level;
}

/* --- */

type Student = User & { courses: { [id: number]: Omit<Course, "role"> & { role: Exclude<Role, "teacher">} } }

type Teacher = Pick<User, "id" | "name">;

type Director = Partial<Pick<User, "id" | "name"> & {
    students?: Record<string, Student>;
    teachers?: Record<string, Partial<Teacher> & { rate?: Rate; }>;
}>;

/*--  Проверка  --*/
const s1: Student = {
    id: "s1",
    name: "s1",
    courses: {
        [1]: {
            id: 1,
            title: "First",
            rate: 5,
            role: "student",
            level: "middle"
        }
    },
}

const t1: Teacher = {
    id: "t1",
    name: "t1",
}

const d1: Director = {
    id: "d1",
    name: "d1",
    students: {
        ["s1"]: s1,
        ["s2"]: {
            id: "s2",
            name: "s2"
        }
    },
    teachers: {
        ["t1"]: {
            ...t1,
            rate: 3,
        },
        ["t2"]: {
            id: "t2",
            name: "t2",
            rate: 5
        }
    }
}
