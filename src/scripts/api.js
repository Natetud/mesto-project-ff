const dotEnv = {
    authToken: 'aeacb1cf-ae3c-43f2-96d7-8fd0c8251e8f',
    myGroupId: 'wff-cohort-38'
}

const config = {
    userApiUrl: `https://nomoreparties.co/v1/${dotEnv.myGroupId}/users/me`,
    cardsApiUrl: `https://nomoreparties.co/v1/${dotEnv.myGroupId}/cards`,
    authorizationToken: dotEnv.authToken,
}

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserData = () => {
    return fetch(config.userApiUrl, {
        headers: {
            authorization: config.authorizationToken
        }
    }).then((res) => checkResponse(res));
}

export const getCards = () => {
    return fetch(config.cardsApiUrl, {
        headers: {
            authorization: config.authorizationToken,
        }
    }).then((res) => checkResponse(res));
}

export const postCard = (cardData) => {
    return fetch(config.cardsApiUrl, {
        method: 'POST',
        headers: {
            authorization: config.authorizationToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link,
        })
    }).then(res => checkResponse(res));
}

export const patchUserData = (name, about) => {
    return fetch(config.userApiUrl, {
        method: 'PATCH',
        headers: {
            authorization: config.authorizationToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then((res) => checkResponse(res));
}

export const patchUserAvatar = (avatar) => {
    return fetch(config.userApiUrl + '/avatar', {
        method: 'PATCH',
        headers: {
            authorization: config.authorizationToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    }).then((res) => checkResponse(res))
}

export const deleteCardApi = (cardId) => {
    return fetch(`${config.cardsApiUrl}/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.authorizationToken
        }
    }).then((res) => checkResponse(res));
}

export const likeCardApi = (cardId) => {
    return fetch(`${config.cardsApiUrl}/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.authorizationToken
        }
    }).then((res) => checkResponse(res));
}

export const unlikeCardApi = (cardId) => {
    return fetch(`${config.cardsApiUrl}/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.authorizationToken
        }
    }).then((res) => checkResponse(res));
}

