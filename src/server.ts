import { prisma } from "../lib/prisma";


async function main() {
    const user = await prisma.user.create({
        data: {
            username: "Sajib Hasan",
            email: "sajib1@mail.com",
            age: 18,
            passwordHash: "12345678",
        }
    });

    console.log("Created User: ", user);
}

main()
.then((data) => console.log(data))
.catch((err) => console.log(err));