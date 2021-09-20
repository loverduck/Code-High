import { type } from "os";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Posttag } from "./Posttag";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar', nullable: true  })
    textContent: string;

    @Column({ type: 'varchar', nullable: true  })
    codeContent: string;

    @Column({ type: 'boolean' })
    secret: boolean;

    @Column({ type: 'int' })
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // foreign key
    // post <-> user n:1
    @ManyToOne((type) => User, (user) => user.posts)
    user: User;

    // post <-> postTag 1:n
    @OneToMany((type) => Posttag, (postTag) => postTag.post, {onDelete: 'CASCADE'})
    postTags: Posttag[];


}