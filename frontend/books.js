document.addEventListener("DOMContentLoaded", function () {
    const books = [
        {
            title: "Eloquent JavaScript",
            image: "https://eloquentjavascript.net/img/cover.jpg",
            description: "A deep dive into JavaScript programming.",
            link: "https://eloquentjavascript.net/"
        },
        {
            title: "Programming Fundamentals",
            image:"https://th.bing.com/th/id/OIP.9oLn7WU8Qh75VKQPH61yqgHaLG?w=202&h=303&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            description: "The basic of coding by Kenneth Leroy Busbee and Dave Braunschweig.",
            link: "https://openlibrary-repo.ecampusontario.ca/jspui/bitstream/123456789/692/3/Programming-Fundamentals-1570222270.pdf"
        },
        {
            title: "Go Programming Language",
            image:"https://m.media-amazon.com/images/I/61GNpAHFttL._SY466_.jpg",
            description: "Hundreds of interesting and practical examples of well-written code.",
            link: "https://www.amazon.co.uk/Programming-Language-Addison-Wesley-Professional-Computing/dp/0134190440/ref=sr_1_9_sspa?crid=2U3U9TJOKW63N&dib=eyJ2IjoiMSJ9.o7TTzGVE4lujTI5GVbk_6V37VDR0VcVd91oDBlZ_mlwjagMp5MyLr7mAjkV6Ep1Z.X_XPEkaLHHICHfxHELU2SSK2FnOcIdw9vatEpk9m9XA&dib_tag=se&keywords=pdf+book+for+programming&qid=1740680133&s=books&sprefix=pdf+book+for+programming%2Cstripbooks%2C70&sr=1-9-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1"
        },
        {
            title: "Python for Everybody",
            image: "https://m.media-amazon.com/images/I/61IGhJoRLzL._SY522_.jpg",
            description: "Beginner-friendly introduction to Python programming.",
            link: "https://www.amazon.co.uk/Python-Everybody-Exploring-Data/dp/1530051126/ref=asc_df_1530051126?tag=bingshoppinga-21&linkCode=df0&hvadid=80264405731069&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=&hvtargid=pla-4583863980693364&psc=1"
        },
        {
            title: "Intro To Python Programming",
            image:"https://m.media-amazon.com/images/I/614HPYSzGyL._SY466_.jpg",
            description: "Set up your own development environment.",
            link: "https://www.amazon.co.uk/Intro-Python-Programming-Beginners-Guide/dp/B09VDRSKB7/ref=sr_1_1?crid=2U3U9TJOKW63N&dib=eyJ2IjoiMSJ9.o7TTzGVE4lujTI5GVbk_6fgfW5CHhm8KQ6ZOkRBKhWfMH37__AmNKWUtFhHRzMQ0oDrrEACQJpugIWCFWw1smXdNuIcJNxui3hZKKDxSYM26Q14JoIZywwKBN_iIzUSW18wt5Nfa7ZkxP_OOgd9AUgGdmznfCqsUsKXohWvXv9sXiEbxeRX4HS-t77jLluUXffkkoiUxPU64NabaFS19_6YMzNygBZAXmye9Lwl5-iHgoW9cJDKRqqRkQoolQQmuXJ9ljeefxJFRrX2xgh13cNa9w6TUbIPwMkoc47AEiIU.x7sx6V2AFT3ExKJ2Lgx0lKrqzQuzLDPU-1iDuEWascg&dib_tag=se&keywords=pdf+book+for+programming&qid=1740679253&s=books&sprefix=pdf+book+for+programming%2Cstripbooks%2C70&sr=1-1"
        },
        {
            title: "Python Programming for Beginners",
            image:"https://m.media-amazon.com/images/I/51tRKRWf1WL._SY466_.jpg",
            description: "This book provides a clear pathway to Python proficiency.",
            link: "https://www.amazon.co.uk/Python-Programming-Beginners-Fast-Track-High-Paying/dp/B0D223XRR9/ref=sr_1_7_sspa?crid=2U3U9TJOKW63N&dib=eyJ2IjoiMSJ9.o7TTzGVE4lujTI5GVbk_6V37VDR0VcVd91oDBlZ_mlwjagMp5MyLr7mAjkV6Ep1Z.X_XPEkaLHHICHfxHELU2SSK2FnOcIdw9vatEpk9m9XA&dib_tag=se&keywords=pdf+book+for+programming&qid=1740680133&s=books&sprefix=pdf+book+for+programming%2Cstripbooks%2C70&sr=1-7-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1"
        },
        {
            title: "JavaScript from Zero to Superhero",
            image:"https://m.media-amazon.com/images/I/61vYNPqLNxL._SY466_.jpg",
            description: "Building websites & dynamic web applications.",
            link: "https://www.amazon.co.uk/JavaScript-Zero-Superhero-Development-Superpowers/dp/B0DF7TGF61/ref=sr_1_8_sspa?crid=1S5NAGIPRT1O6&dib=eyJ2IjoiMSJ9.JRxsedKDpoG7qv42P6LjeMNV1covG_fMD3Ne3NJD0UMKrq9oGLa-q1bHRnOn63wnX-6MM_9fBfODwY_oGsnzG5IHXxnBatQwYtyUx3yWflGf0Ts72XsPn8KAygJ3u-i_Kl27GaHRFtHFx1_p4HrIc0W9EOgvT7sofSD4wxojvFiKZBCB7iLwc7q9K1VCHaYoYcvB9WiGYJ80J_tOz1dnf4GIMIhGHnd4lyVjE0eucRw.K4T8-OD2dHw4hk-9eOhnQakwOHlKbao4J1p3HpT8sd8&dib_tag=se&keywords=programming+books&qid=1740680569&refinements=p_n_feature_browse-bin%3A400530011%2Cp_72%3A184315031&rnid=184297031&s=books&sprefix=programming+books%2Cstripbooks%2C106&sr=1-8-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1"
        },
        {
            title: "Python Crash Course",
            image:"https://m.media-amazon.com/images/I/519mXag83nL._SY445_SX342_.jpg",
            description: "Writing programs, solving problems and developing functioning applications.",
            link: "https://www.amazon.co.uk/Python-Crash-Course-3Rd-Matthes/dp/1718502702/ref=sr_1_6?crid=1S5NAGIPRT1O6&dib=eyJ2IjoiMSJ9.JRxsedKDpoG7qv42P6LjeMNV1covG_fMD3Ne3NJD0UMKrq9oGLa-q1bHRnOn63wnX-6MM_9fBfODwY_oGsnzG5IHXxnBatQwYtyUx3yWflGoqvXl-PrpUiNk0yStD-AvSDeoMQRDi1HzteyAJ9fptxKgq1ls-lEra-0RyugrRCmmozJSROp4VrHlDF-AJMwhYcvB9WiGYJ80J_tOz1dnf4GIMIhGHnd4lyVjE0eucRw.94wMQcCLbTrSf7YzlVsc6XhlZqSUrQM65zwPQ0aVfB8&dib_tag=se&keywords=programming+books&qid=1740680856&refinements=p_n_feature_browse-bin%3A400530011%2Cp_72%3A184315031&rnid=184297031&s=books&sprefix=programming+books%2Cstripbooks%2C106&sr=1-6"
        },
        {
            title: "You Don't Know JS",
            image: "https://m.media-amazon.com/images/I/61sAMmSyhZL._SY522_.jpg",
            description: "An in-depth JavaScript series by Kyle Simpson.",
            link: "https://www.amazon.co.uk/You-Dont-Know-JS-Yet/dp/B084DFZ6GW/ref=asc_df_B084DFZ6GW?tag=bingshoppinga-21&linkCode=df0&hvadid=80745482579219&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=&hvtargid=pla-4584345023630733&psc=1"
        }
    ];

    const bookList = document.getElementById("book-list");

    books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.description}</p>
            <a href="${book.link}" target="_blank">Read Now</a>
        `;

        bookList.appendChild(bookCard);
    });
});
