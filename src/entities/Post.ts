import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column({
        name: "creation_date"
    })
    creationDate: Date;

    @Column({
        name: "user_id"
    })
    userId: number;
}

