'use strict'

const heroBlock = document.querySelector('#hero-block');
const select = document.querySelector('select');

const render = (data) => {
    const renderBlock = data.reduce((acc, curr) => {
        return acc.concat(` 
            <div class="item">
                <div class="hero">
                    <div class="thumb-img">
                        <img src=${curr.photo}>
                    </div>
                    <div class="hero-about">
                        <div class="hero-title">
                            <p>Name: ${curr.name}</p>
                            <p>Real name: ${curr.realName === undefined ? 'Unknown' : curr.realName}</p>
                            <p>Movie list: ${curr.movies === undefined ? 'Unknown' : curr.movies.join(', ')}</p>
                            <p>Status: ${curr.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }, '');

    heroBlock.innerHTML = renderBlock;
}

const filtered = ({ data, filtedredMovies }) => {
    const dataWithoutUndefined = data.filter((el) => el.movies !== undefined);

    select.addEventListener('change', () => {
        if (select.value === '') render(data)

        filtedredMovies.forEach(item => {
            if (select.value === item) {
                render(dataWithoutUndefined.filter(element => element.movies.includes(item)))
            }
        })
    })
}

const addSelectOption = (data) => {
    let arrayMovies = []
    let filtedredMovies = []

    data.forEach((item) => {
        if (!(item.movies === undefined)){
            item.movies.forEach((item) => {
                arrayMovies.push(item.trim())
            })
        }
    })

    filtedredMovies = arrayMovies.filter((el, id) => arrayMovies.indexOf(el) === id).sort();

    filtedredMovies.forEach((item) => {
        const optionMovie = new Option(item, item);
        select.append(optionMovie);
    })

    filtered({ data, filtedredMovies })
}

fetch('./dbHeroes.json')
    .then((response) => response.json())
    .then((data) => {
        addSelectOption(data)
        render(data)
    })
    .catch((error) => console.log(error))