import mongoose from "mongoose";
import config from "./config";
import * as crypto from "node:crypto";
import Category from "./modules/Category";
import Product from "./modules/Product";
import User from "./modules/User";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('categories');
        await db.dropCollection('products');
        await db.dropCollection('users');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }


    const [carCategory, boatCategory, bikeCategory] = await Category.create(
        {
            title: 'Cars',
            description: 'vehicle that has wheels, carries a small number of passengers, and is moved by an engine or a motor',
        },
        {
            title: 'Boats',
            description: 'a watercraft of a large range of sizes designed to float, plane, work or travel on water',
        },
        {
            title: 'Bikes',
            description: 'two-wheeled steerable machine that is pedaled by the riders feet',
        }
    );
    const [user1, user2] = await User.create(
        {
            username: "Wade",
            password: "123",
            displayName: 'Wade242',
            phone: 3050534232,
            token: crypto.randomUUID()
        },
        {
            username: 'Johnson',
            password: "456",
            displayName: 'John',
            phone: 3564657575,
            token: crypto.randomUUID()
        }
    )

    await Product.create(
        {
            user: user1._id,
            title: "BMW X7",
            price: 46000,
            category: carCategory._id,
            description: 'автомобиль в отличном состоянии, богатая комплектация — черный кожаный салон с комфортными капитанскими сидениями второго ряда, многозонный климат-контроль, мультируль, адаптивный круиз-контроль, безключевой доступ, панорамная крыша, проекция на лобовое стекло, премиальная аудиосистема, камера кругового обзора, парктроники по кругу, ассистенты удержания полосы и предотвращения столкновений, подогрев и вентиляция сидений, электропривод и память сидений, атмосферная подсветка, выбор режимов движения, система помощи при спуске, электропривод багажника, качественная акустика и многое другое',
            image: 'fixtures/bmw.jpg'
        },
        {
            user: user2._id,
            title: "Hyundai Grandeur VI",
            price: 17800,
            category: carCategory._id,
            description: 'LED-оптика, адаптивный круиз-контроль, система удержания в полосе, бесключевой доступ и запуск с кнопки, передние и задние парктроники, камера заднего вида, подогрев передних и задних сидений, вентиляция передних сидений, электропривод сидений с памятью, премиальная мультимедиа-система, двухзонный климат-контроль, мультируль, выбор режимов движения, атмосферная подсветка салона, светлый потолок (алькантара), электроскладывание зеркал, оригинальные диски, хорошая акустика и многое другое.',
            image: 'fixtures/grandeur.jpg'
        },
        {
        user: user1._id,
            title: "Performance 1401",
            price: 399900,
            category: boatCategory._id,
            description: 'REDUZIERTER AKTIONSPREIS von 449.900,- auf 399.900,- € EU-VERSTEUERT !\n' +
                'Der aktuelle Listenpreis mit Sonderausstattung beträgt 1.022.602,- €.\n' +
                'SOFORT EINSATZBEREIT UND LIEFERBAR!',
            image: 'fixtures/boat-1.webp'
        },
        {
            user: user1._id,
            title: "Performance 1307",
            price: 190000,
            category: boatCategory._id,
            description: '(ES) EMBARCACION ABIERTA REVISADA POR AGENTES OFICIALES, ANTIFOULING 2022, MOQUETAS NUEVAS  INTERIOR 2022, REVISION MOTORES 2022 Y MATERIAL DE SEGURIDAD NUEVO 2022, BARCO LISTO PARA NAVEGAR.',
            image: 'fixtures/boat-2.webp'
        },
        {
            user: user2._id,
            title: "Lady Bicycle",
            price: 285,
            category: bikeCategory._id,
            description: 'Coaster Brake Single Speed Women Bike',
            image: 'fixtures/bike-1.webp'
        },
        {
            user: user2._id,
            title: "Frike Electric Fat Tire Bike",
            price: 1299,
            category: bikeCategory._id,
            description: '26 - 250W Motor, 36V Battery, Red/White, Off-Road',
            image: 'fixtures/bike-2.webp'
        },

    );



    await db.close();
};

run().catch(console.error);