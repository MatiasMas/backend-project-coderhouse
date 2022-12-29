## Coderhouse Backend project.

**Steps to setup the proxy server with load balancer.**

1. First, we need to start the server in port 8080 in Fork mode by using the "forever-fork-mongo" from the package.json file which is the same as:
> forever -w start src/server.js 8080 mongo fork

2. Second, we need to start the server in port 8081 in Cluster mode by using the "forever-cluster-mongo" from the package.json file which is the same as:
> forever -w start src/server.js 8081 mongo cluster

3. Third, start the nginx server by running the nginx.exe file on the repository, it is already configured to balance the traffic to 8080 and 8081.

*With this, requests to /randoms go to 8081 balancing the load while the 8080 port will handle the rest.*

---

**There are two main api routes:**
- api/products
- api/carts

---

### Product Endpoints. 

Endpoints provided with examples:
- **GET api/products/**
  - Description: Return all products.

<details>
<summary>Example</summary>

Response:
```
{
  "products": [
    {
      "name": "Resident Evil 2",
      "price": 850,
      "category": "games",
      "img": "https://uvejuegos.com/img/caratulas/57232/resident-evil-2-remake-EU-PC.jpg",
      "colors": [
        "blue",
        "red",
        "green"
      ],
      "minimumStock": 1,
      "rating": 4.5,
      "reviews": 144,
      "stars": 5,
      "stock": 10,
      "description": "Resident Evil 2a​ —cuyo título original es Biohazard 2 (バイオハザード2 Baiohazādo Tsū?, «Peligro biológico 2»)—b​ es un videojuego japonés del género horror de supervivencia, desarrollado por Capcom y lanzado para PlayStation en 1998. Se trata de la segunda entrega en la serie de videojuegos Resident Evil.  La trama tiene lugar dos meses después de los acontecimientos del primer juego. Transcurre en Raccoon City, una ciudad estadounidense cuya población en su mayoría ha sido transformada en zombi por el virus-T, un arma biológica desarrollada por la compañía Umbrella. Mientras huyen de la ciudad, el oficial Leon S. Kennedy y la estudiante universitaria Claire Redfield se conocen y unen a otros supervivientes, y descubren que Umbrella trata de apoderarse de una muestra del nuevo virus para continuar con sus experimentos biológicos en seres humanos.",
      "id": 1
    },
    {
      "name": "Battlefield 1",
      "price": 500,
      "category": "games",
      "img": "https://uvejuegos.com/img/caratulas/56708/BF1-PC-B.jpg",
      "colors": [
        "blue",
        "red",
        "green"
      ],
      "minimumStock": 1,
      "rating": 3.9,
      "reviews": 50,
      "stars": 4,
      "stock": 25,
      "description": "Battlefield 1 es un videojuego de disparos y acción bélica en primera persona. El título fue desarrollado por DICE y distribuido mundialmente por Electronic Arts para PlayStation 4, Xbox One y Microsoft Windows. Es el décimo quinto juego de la serie Battlefield y el primer título de la serie que se ambienta en la Primera Guerra Mundial por Electronic Arts desde Wings of Glory en 1994. El juego fue confirmado en mayo de 2016 por Electronic Arts.1​ Su lanzamiento ocurrió el 21 de octubre de 2016.",
      "id": 2
    }
  ]
}
```
</details>

---

- **GET api/products/{id}**
  - Description: Get the product by id.
  - Parameters:
    - id: Product id to be returned.

<details>
<summary>Example</summary>

Response:
```
{
  "product": {
    "name": "Dr Stone Manga",
    "price": 450,
    "category": "mangas",
    "img": "https://elmundodeshirohome.files.wordpress.com/2020/08/el-manga-dr.-stone-revela-la-portada-de-su-volumen-17.jpg",
    "colors": [
      "blue",
      "red",
      "green"
    ],
    "minimumStock": 1,
    "rating": 4.9,
    "reviews": 255,
    "stars": 5,
    "stock": 19,
    "description": "Dr. Stone (ドクターストーン Dokutā Sutōn?), estilizado como Dr. STONE, es un manga de ficción post-apocalíptico escrito por Riichiro Inagaki (escritor de Eyeshield 21) e ilustrado por Boichi (autor de Sun-Ken Rock). La historia cuenta las aventuras de Senku y Taiju, dos adolescentes que se ven atrapados en un mundo post-apocalíptico en el que la raza humana se ha convertido en piedra y ellos buscan la manera de revertir la petrificación en la mayor cantidad de personas posibles, para así reconstruir la sociedad tal como la conocieron.  El manga que está publicándose desde el 6 de marzo de 2017 en las páginas de la revista Shūkan Shōnen Jump actualmente está recopilado en veintiuno Tankōbon hasta junio de 2021. La Editorial Ivrea ha licenciado el manga en España y se ha hecho la serie de anime con estreno de julio de 2019.",
    "id": 3
  }
}
```
</details>

---

- **POST api/products/**
    - Description: Create a new product.
    - Parameters: JSON Body required, check the example.

<details>
<summary>Example</summary>

JSON Body structure required:
```
{
  "name": "Kaneki Figure",
  "price": 1200,
  "category": "figures",
  "img": "https://qph.fs.quoracdn.net/main-qimg-9ec57820b0ecb331f2bc18b32baac7e0",
  "colors": ["blue", "red", "green"],
  "minimumStock": 1,
  "rating": 4.6,
  "reviews": 10,
  "stars": 5,
  "stock": 3,
  "description": "Ken Kaneki (金木 研かねき けん, Kaneki Ken?) es el protagonista principal de la serie Tokyo Ghoul y Tokyo Ghoul:re.  Anteriormente era un estudiante de literatura japonesa en la Universidad Kamii. Su vida cambio radicalmente después de tener un encuentro con un Ghoul del cual le transplantaron un riñon y otros órganos digestivos convirtiéndole en un Ghoul de un Ojo. Después de una serie de eventos, decide unirse a Anteiku como camarero de tiempo parcial, mientras trata de vivir una vida como un humano. Es nombrado por el CCG cómo Ojo Parchado (眼帯, Gantai?)."
}
```
Response:
```
{
  "product": {
    "name": "Kaneki Figure",
    "price": 1200,
    "category": "figures",
    "img": "https://qph.fs.quoracdn.net/main-qimg-9ec57820b0ecb331f2bc18b32baac7e0",
    "colors": [
      "blue",
      "red",
      "green"
    ],
    "minimumStock": 1,
    "rating": 4.6,
    "reviews": 10,
    "stars": 5,
    "stock": 3,
    "description": "Ken Kaneki (金木 研かねき けん, Kaneki Ken?) es el protagonista principal de la serie Tokyo Ghoul y Tokyo Ghoul:re.  Anteriormente era un estudiante de literatura japonesa en la Universidad Kamii. Su vida cambio radicalmente después de tener un encuentro con un Ghoul del cual le transplantaron un riñon y otros órganos digestivos convirtiéndole en un Ghoul de un Ojo. Después de una serie de eventos, decide unirse a Anteiku como camarero de tiempo parcial, mientras trata de vivir una vida como un humano. Es nombrado por el CCG cómo Ojo Parchado (眼帯, Gantai?).",
    "id": 8
  }
}
```
</details>

---

- **PUT api/products/{id}**
    - Description: Updates an existent product.
    - Parameters:
      - id: Id of the product to be updated.

<details>
<summary>Example</summary>

JSON Body structure required:
```
{
  "name": "Dr Stone Manga",
  "price": 450,
  "category": "mangas",
  "img": "https://elmundodeshirohome.files.wordpress.com/2020/08/el-manga-dr.-stone-revela-la-portada-de-su-volumen-17.jpg",
  "colors": ["blue", "red", "green"],
  "minimumStock": 1,
  "rating": 4.9,
  "reviews": 255,
  "stars": 5,
  "stock": 19,
  "description": "Dr. Stone (ドクターストーン Dokutā Sutōn?), estilizado como Dr. STONE, es un manga de ficción post-apocalíptico escrito por Riichiro Inagaki (escritor de Eyeshield 21) e ilustrado por Boichi (autor de Sun-Ken Rock). La historia cuenta las aventuras de Senku y Taiju, dos adolescentes que se ven atrapados en un mundo post-apocalíptico en el que la raza humana se ha convertido en piedra y ellos buscan la manera de revertir la petrificación en la mayor cantidad de personas posibles, para así reconstruir la sociedad tal como la conocieron.  El manga que está publicándose desde el 6 de marzo de 2017 en las páginas de la revista Shūkan Shōnen Jump actualmente está recopilado en veintiuno Tankōbon hasta junio de 2021. La Editorial Ivrea ha licenciado el manga en España y se ha hecho la serie de anime con estreno de julio de 2019."
}
```
Response:
```
{
  "product": {
    "name": "Dr Stone Manga",
    "price": 450,
    "category": "mangas",
    "img": "https://elmundodeshirohome.files.wordpress.com/2020/08/el-manga-dr.-stone-revela-la-portada-de-su-volumen-17.jpg",
    "colors": [
      "blue",
      "red",
      "green"
    ],
    "minimumStock": 1,
    "rating": 4.9,
    "reviews": 255,
    "stars": 5,
    "stock": 19,
    "description": "Dr. Stone (ドクターストーン Dokutā Sutōn?), estilizado como Dr. STONE, es un manga de ficción post-apocalíptico escrito por Riichiro Inagaki (escritor de Eyeshield 21) e ilustrado por Boichi (autor de Sun-Ken Rock). La historia cuenta las aventuras de Senku y Taiju, dos adolescentes que se ven atrapados en un mundo post-apocalíptico en el que la raza humana se ha convertido en piedra y ellos buscan la manera de revertir la petrificación en la mayor cantidad de personas posibles, para así reconstruir la sociedad tal como la conocieron.  El manga que está publicándose desde el 6 de marzo de 2017 en las páginas de la revista Shūkan Shōnen Jump actualmente está recopilado en veintiuno Tankōbon hasta junio de 2021. La Editorial Ivrea ha licenciado el manga en España y se ha hecho la serie de anime con estreno de julio de 2019.",
    "id": 8
  }
}
```
</details>

---

- **DELETE api/products/{id}**
    - Description: Delete the product by id.
    - Parameters:
        - id: Product id to be deleted.

<details>
<summary>Example</summary>

Response:
```
{
  "productDeleted": {
    "name": "Dr Stone Manga",
    "price": 450,
    "category": "mangas",
    "img": "https://elmundodeshirohome.files.wordpress.com/2020/08/el-manga-dr.-stone-revela-la-portada-de-su-volumen-17.jpg",
    "colors": [
      "blue",
      "red",
      "green"
    ],
    "minimumStock": 1,
    "rating": 4.9,
    "reviews": 255,
    "stars": 5,
    "stock": 19,
    "description": "Dr. Stone (ドクターストーン Dokutā Sutōn?), estilizado como Dr. STONE, es un manga de ficción post-apocalíptico escrito por Riichiro Inagaki (escritor de Eyeshield 21) e ilustrado por Boichi (autor de Sun-Ken Rock). La historia cuenta las aventuras de Senku y Taiju, dos adolescentes que se ven atrapados en un mundo post-apocalíptico en el que la raza humana se ha convertido en piedra y ellos buscan la manera de revertir la petrificación en la mayor cantidad de personas posibles, para así reconstruir la sociedad tal como la conocieron.  El manga que está publicándose desde el 6 de marzo de 2017 en las páginas de la revista Shūkan Shōnen Jump actualmente está recopilado en veintiuno Tankōbon hasta junio de 2021. La Editorial Ivrea ha licenciado el manga en España y se ha hecho la serie de anime con estreno de julio de 2019.",
    "id": 8
  }
}
```
</details>

- **GET api/products/faker**
  - Description: Return 5 random products generated with the faker library.

<details>
<summary>Example</summary>

Response:
```
{
  "products": [
    {
      "name": "Resident Evil 2",
      "price": 850,
      "category": "games",
      "img": "https://uvejuegos.com/img/caratulas/57232/resident-evil-2-remake-EU-PC.jpg",
      "colors": [
        "blue",
        "red",
        "green"
      ],
      "minimumStock": 1,
      "rating": 4.5,
      "reviews": 144,
      "stars": 5,
      "stock": 10,
      "description": "Resident Evil 2a​ —cuyo título original es Biohazard 2 (バイオハザード2 Baiohazādo Tsū?, «Peligro biológico 2»)—b​ es un videojuego japonés del género horror de supervivencia, desarrollado por Capcom y lanzado para PlayStation en 1998. Se trata de la segunda entrega en la serie de videojuegos Resident Evil.  La trama tiene lugar dos meses después de los acontecimientos del primer juego. Transcurre en Raccoon City, una ciudad estadounidense cuya población en su mayoría ha sido transformada en zombi por el virus-T, un arma biológica desarrollada por la compañía Umbrella. Mientras huyen de la ciudad, el oficial Leon S. Kennedy y la estudiante universitaria Claire Redfield se conocen y unen a otros supervivientes, y descubren que Umbrella trata de apoderarse de una muestra del nuevo virus para continuar con sus experimentos biológicos en seres humanos.",
      "id": 1
    },
    {
      "name": "Battlefield 1",
      "price": 500,
      "category": "games",
      "img": "https://uvejuegos.com/img/caratulas/56708/BF1-PC-B.jpg",
      "colors": [
        "blue",
        "red",
        "green"
      ],
      "minimumStock": 1,
      "rating": 3.9,
      "reviews": 50,
      "stars": 4,
      "stock": 25,
      "description": "Battlefield 1 es un videojuego de disparos y acción bélica en primera persona. El título fue desarrollado por DICE y distribuido mundialmente por Electronic Arts para PlayStation 4, Xbox One y Microsoft Windows. Es el décimo quinto juego de la serie Battlefield y el primer título de la serie que se ambienta en la Primera Guerra Mundial por Electronic Arts desde Wings of Glory en 1994. El juego fue confirmado en mayo de 2016 por Electronic Arts.1​ Su lanzamiento ocurrió el 21 de octubre de 2016.",
      "id": 2
    }
  ]
}
```
</details>

---

### Cart Endpoints.

Endpoints provided with examples:
- **GET api/carts/**
    - Description: Return all carts.

<details>
<summary>Example</summary>

Response:
```
{
  "carts": [
    {
      "timestamp": "12/11/2022, 1:31:29",
      "products": [
        {
          "name": "Resident Evil 2",
          "price": 850,
          "category": "games",
          "img": "https://uvejuegos.com/img/caratulas/57232/resident-evil-2-remake-EU-PC.jpg",
          "colors": [
            "blue",
            "red",
            "green"
          ],
          "minimumStock": 1,
          "rating": 4.5,
          "reviews": 144,
          "stars": 5,
          "stock": 10,
          "description": "Resident Evil 2a​ —cuyo título original es Biohazard 2 (バイオハザード2 Baiohazādo Tsū?, «Peligro biológico 2»)—b​ es un videojuego japonés del género horror de supervivencia, desarrollado por Capcom y lanzado para PlayStation en 1998. Se trata de la segunda entrega en la serie de videojuegos Resident Evil.  La trama tiene lugar dos meses después de los acontecimientos del primer juego. Transcurre en Raccoon City, una ciudad estadounidense cuya población en su mayoría ha sido transformada en zombi por el virus-T, un arma biológica desarrollada por la compañía Umbrella. Mientras huyen de la ciudad, el oficial Leon S. Kennedy y la estudiante universitaria Claire Redfield se conocen y unen a otros supervivientes, y descubren que Umbrella trata de apoderarse de una muestra del nuevo virus para continuar con sus experimentos biológicos en seres humanos.",
          "id": 1
        },
        {
          "name": "Battlefield 1",
          "price": 500,
          "category": "games",
          "img": "https://uvejuegos.com/img/caratulas/56708/BF1-PC-B.jpg",
          "colors": [
            "blue",
            "red",
            "green"
          ],
          "minimumStock": 1,
          "rating": 3.9,
          "reviews": 50,
          "stars": 4,
          "stock": 25,
          "description": "Battlefield 1 es un videojuego de disparos y acción bélica en primera persona. El título fue desarrollado por DICE y distribuido mundialmente por Electronic Arts para PlayStation 4, Xbox One y Microsoft Windows. Es el décimo quinto juego de la serie Battlefield y el primer título de la serie que se ambienta en la Primera Guerra Mundial por Electronic Arts desde Wings of Glory en 1994. El juego fue confirmado en mayo de 2016 por Electronic Arts.1​ Su lanzamiento ocurrió el 21 de octubre de 2016.",
          "id": 2
        },
        {
          "name": "Dr Stone Manga",
          "price": 450,
          "category": "mangas",
          "img": "https://elmundodeshirohome.files.wordpress.com/2020/08/el-manga-dr.-stone-revela-la-portada-de-su-volumen-17.jpg",
          "colors": [
            "blue",
            "red",
            "green"
          ],
          "minimumStock": 1,
          "rating": 4.9,
          "reviews": 255,
          "stars": 5,
          "stock": 19,
          "description": "Dr. Stone (ドクターストーン Dokutā Sutōn?), estilizado como Dr. STONE, es un manga de ficción post-apocalíptico escrito por Riichiro Inagaki (escritor de Eyeshield 21) e ilustrado por Boichi (autor de Sun-Ken Rock). La historia cuenta las aventuras de Senku y Taiju, dos adolescentes que se ven atrapados en un mundo post-apocalíptico en el que la raza humana se ha convertido en piedra y ellos buscan la manera de revertir la petrificación en la mayor cantidad de personas posibles, para así reconstruir la sociedad tal como la conocieron.  El manga que está publicándose desde el 6 de marzo de 2017 en las páginas de la revista Shūkan Shōnen Jump actualmente está recopilado en veintiuno Tankōbon hasta junio de 2021. La Editorial Ivrea ha licenciado el manga en España y se ha hecho la serie de anime con estreno de julio de 2019.",
          "id": 3
        },
        {
          "name": "Kaneki Figure",
          "price": 1200,
          "category": "figures",
          "img": "https://qph.fs.quoracdn.net/main-qimg-9ec57820b0ecb331f2bc18b32baac7e0",
          "colors": [
            "blue",
            "red",
            "green"
          ],
          "minimumStock": 1,
          "rating": 4.6,
          "reviews": 10,
          "stars": 5,
          "stock": 3,
          "description": "Ken Kaneki (金木 研かねき けん, Kaneki Ken?) es el protagonista principal de la serie Tokyo Ghoul y Tokyo Ghoul:re.  Anteriormente era un estudiante de literatura japonesa en la Universidad Kamii. Su vida cambio radicalmente después de tener un encuentro con un Ghoul del cual le transplantaron un riñon y otros órganos digestivos convirtiéndole en un Ghoul de un Ojo. Después de una serie de eventos, decide unirse a Anteiku como camarero de tiempo parcial, mientras trata de vivir una vida como un humano. Es nombrado por el CCG cómo Ojo Parchado (眼帯, Gantai?).",
          "id": 4
        }
      ],
      "id": 1
    },
    {
      "timestamp": "12/11/2022, 12:40:46",
      "products": [
        {
          "name": "Kaneki Figure",
          "price": 1200,
          "category": "figures",
          "img": "https://qph.fs.quoracdn.net/main-qimg-9ec57820b0ecb331f2bc18b32baac7e0",
          "colors": [
            "blue",
            "red",
            "green"
          ],
          "minimumStock": 1,
          "rating": 4.6,
          "reviews": 10,
          "stars": 5,
          "stock": 3,
          "description": "Ken Kaneki (金木 研かねき けん, Kaneki Ken?) es el protagonista principal de la serie Tokyo Ghoul y Tokyo Ghoul:re.  Anteriormente era un estudiante de literatura japonesa en la Universidad Kamii. Su vida cambio radicalmente después de tener un encuentro con un Ghoul del cual le transplantaron un riñon y otros órganos digestivos convirtiéndole en un Ghoul de un Ojo. Después de una serie de eventos, decide unirse a Anteiku como camarero de tiempo parcial, mientras trata de vivir una vida como un humano. Es nombrado por el CCG cómo Ojo Parchado (眼帯, Gantai?).",
          "id": 4
        },
        {
          "name": "Deku Midoriya",
          "price": 500,
          "category": "figures",
          "img": "https://bbts1.azureedge.net/images/p/full/2021/10/e8e6d87b-02b5-4f38-8277-0c222a6ef913.jpg",
          "colors": [
            "red",
            "blue",
            "green"
          ],
          "minimumStock": 1,
          "rating": 1,
          "reviews": 1,
          "stars": 1,
          "stock": 5,
          "description": "This a 1/5 scale figure of Deku Midoriya of BHA",
          "id": 5
        }
      ],
      "id": 2
    }
  ]
}
```
</details>

---

- **GET api/carts/{id}/products/**
    - Description: Get the cart by id.
    - Parameters:
        - id: Id of cart to be returned.

<details>
<summary>Example</summary>

Response:
```
{
  "cart": {
    "timestamp": "12/11/2022, 12:40:46",
    "products": [
      {
        "name": "Kaneki Figure",
        "price": 1200,
        "category": "figures",
        "img": "https://qph.fs.quoracdn.net/main-qimg-9ec57820b0ecb331f2bc18b32baac7e0",
        "colors": [
          "blue",
          "red",
          "green"
        ],
        "minimumStock": 1,
        "rating": 4.6,
        "reviews": 10,
        "stars": 5,
        "stock": 3,
        "description": "Ken Kaneki (金木 研かねき けん, Kaneki Ken?) es el protagonista principal de la serie Tokyo Ghoul y Tokyo Ghoul:re.  Anteriormente era un estudiante de literatura japonesa en la Universidad Kamii. Su vida cambio radicalmente después de tener un encuentro con un Ghoul del cual le transplantaron un riñon y otros órganos digestivos convirtiéndole en un Ghoul de un Ojo. Después de una serie de eventos, decide unirse a Anteiku como camarero de tiempo parcial, mientras trata de vivir una vida como un humano. Es nombrado por el CCG cómo Ojo Parchado (眼帯, Gantai?).",
        "id": 4
      },
      {
        "name": "Deku Midoriya",
        "price": 500,
        "category": "figures",
        "img": "https://bbts1.azureedge.net/images/p/full/2021/10/e8e6d87b-02b5-4f38-8277-0c222a6ef913.jpg",
        "colors": [
          "red",
          "blue",
          "green"
        ],
        "minimumStock": 1,
        "rating": 1,
        "reviews": 1,
        "stars": 1,
        "stock": 5,
        "description": "This a 1/5 scale figure of Deku Midoriya of BHA",
        "id": 5
      }
    ],
    "id": 2
  }
}
```
</details>

---

- **POST api/carts/**
    - Description: Create a new cart.
    - Parameters: JSON Body required, check the example.

<details>
<summary>Example</summary>

JSON Body structure required, array of product ids, they must exist on the system:
```
{
  "products": [1, 2, 3]
}
```
Response:
```
{
  "cart": [
    {
      "name": "Resident Evil 2",
      "price": 850,
      "category": "games",
      "img": "https://uvejuegos.com/img/caratulas/57232/resident-evil-2-remake-EU-PC.jpg",
      "colors": [
        "blue",
        "red",
        "green"
      ],
      "minimumStock": 1,
      "rating": 4.5,
      "reviews": 144,
      "stars": 5,
      "stock": 10,
      "description": "Resident Evil 2a​ —cuyo título original es Biohazard 2 (バイオハザード2 Baiohazādo Tsū?, «Peligro biológico 2»)—b​ es un videojuego japonés del género horror de supervivencia, desarrollado por Capcom y lanzado para PlayStation en 1998. Se trata de la segunda entrega en la serie de videojuegos Resident Evil.  La trama tiene lugar dos meses después de los acontecimientos del primer juego. Transcurre en Raccoon City, una ciudad estadounidense cuya población en su mayoría ha sido transformada en zombi por el virus-T, un arma biológica desarrollada por la compañía Umbrella. Mientras huyen de la ciudad, el oficial Leon S. Kennedy y la estudiante universitaria Claire Redfield se conocen y unen a otros supervivientes, y descubren que Umbrella trata de apoderarse de una muestra del nuevo virus para continuar con sus experimentos biológicos en seres humanos.",
      "id": 1
    },
    {
      "name": "Battlefield 1",
      "price": 500,
      "category": "games",
      "img": "https://uvejuegos.com/img/caratulas/56708/BF1-PC-B.jpg",
      "colors": [
        "blue",
        "red",
        "green"
      ],
      "minimumStock": 1,
      "rating": 3.9,
      "reviews": 50,
      "stars": 4,
      "stock": 25,
      "description": "Battlefield 1 es un videojuego de disparos y acción bélica en primera persona. El título fue desarrollado por DICE y distribuido mundialmente por Electronic Arts para PlayStation 4, Xbox One y Microsoft Windows. Es el décimo quinto juego de la serie Battlefield y el primer título de la serie que se ambienta en la Primera Guerra Mundial por Electronic Arts desde Wings of Glory en 1994. El juego fue confirmado en mayo de 2016 por Electronic Arts.1​ Su lanzamiento ocurrió el 21 de octubre de 2016.",
      "id": 2
    },
    {
      "name": "Dr Stone Manga",
      "price": 450,
      "category": "mangas",
      "img": "https://elmundodeshirohome.files.wordpress.com/2020/08/el-manga-dr.-stone-revela-la-portada-de-su-volumen-17.jpg",
      "colors": [
        "blue",
        "red",
        "green"
      ],
      "minimumStock": 1,
      "rating": 4.9,
      "reviews": 255,
      "stars": 5,
      "stock": 19,
      "description": "Dr. Stone (ドクターストーン Dokutā Sutōn?), estilizado como Dr. STONE, es un manga de ficción post-apocalíptico escrito por Riichiro Inagaki (escritor de Eyeshield 21) e ilustrado por Boichi (autor de Sun-Ken Rock). La historia cuenta las aventuras de Senku y Taiju, dos adolescentes que se ven atrapados en un mundo post-apocalíptico en el que la raza humana se ha convertido en piedra y ellos buscan la manera de revertir la petrificación en la mayor cantidad de personas posibles, para así reconstruir la sociedad tal como la conocieron.  El manga que está publicándose desde el 6 de marzo de 2017 en las páginas de la revista Shūkan Shōnen Jump actualmente está recopilado en veintiuno Tankōbon hasta junio de 2021. La Editorial Ivrea ha licenciado el manga en España y se ha hecho la serie de anime con estreno de julio de 2019.",
      "id": 3
    }
  ]
}
```
</details>

---

- **POST api/carts/{id}/products**
  - Description: Add an existent product to an existent cart.
  - Parameters:
    - id: Cart id where the product is going to be inserted.
    - JSON Body required, check the example.

<details>
<summary>Example</summary>

JSON Body structure required, product id, it must exist on the system:
```
{
  "productToAdd": 6
}
```
Response:
```
{
  "cartUpdated": {
    "timestamp": "12/11/2022, 1:31:29",
    "products": [
      {
        "name": "Resident Evil 2",
        "price": 850,
        "category": "games",
        "img": "https://uvejuegos.com/img/caratulas/57232/resident-evil-2-remake-EU-PC.jpg",
        "colors": [
          "blue",
          "red",
          "green"
        ],
        "minimumStock": 1,
        "rating": 4.5,
        "reviews": 144,
        "stars": 5,
        "stock": 10,
        "description": "Resident Evil 2a​ —cuyo título original es Biohazard 2 (バイオハザード2 Baiohazādo Tsū?, «Peligro biológico 2»)—b​ es un videojuego japonés del género horror de supervivencia, desarrollado por Capcom y lanzado para PlayStation en 1998. Se trata de la segunda entrega en la serie de videojuegos Resident Evil.  La trama tiene lugar dos meses después de los acontecimientos del primer juego. Transcurre en Raccoon City, una ciudad estadounidense cuya población en su mayoría ha sido transformada en zombi por el virus-T, un arma biológica desarrollada por la compañía Umbrella. Mientras huyen de la ciudad, el oficial Leon S. Kennedy y la estudiante universitaria Claire Redfield se conocen y unen a otros supervivientes, y descubren que Umbrella trata de apoderarse de una muestra del nuevo virus para continuar con sus experimentos biológicos en seres humanos.",
        "id": 1
      },
      {
        "name": "Battlefield 1",
        "price": 500,
        "category": "games",
        "img": "https://uvejuegos.com/img/caratulas/56708/BF1-PC-B.jpg",
        "colors": [
          "blue",
          "red",
          "green"
        ],
        "minimumStock": 1,
        "rating": 3.9,
        "reviews": 50,
        "stars": 4,
        "stock": 25,
        "description": "Battlefield 1 es un videojuego de disparos y acción bélica en primera persona. El título fue desarrollado por DICE y distribuido mundialmente por Electronic Arts para PlayStation 4, Xbox One y Microsoft Windows. Es el décimo quinto juego de la serie Battlefield y el primer título de la serie que se ambienta en la Primera Guerra Mundial por Electronic Arts desde Wings of Glory en 1994. El juego fue confirmado en mayo de 2016 por Electronic Arts.1​ Su lanzamiento ocurrió el 21 de octubre de 2016.",
        "id": 2
      },
      {
        "name": "Dr Stone Manga",
        "price": 450,
        "category": "mangas",
        "img": "https://elmundodeshirohome.files.wordpress.com/2020/08/el-manga-dr.-stone-revela-la-portada-de-su-volumen-17.jpg",
        "colors": [
          "blue",
          "red",
          "green"
        ],
        "minimumStock": 1,
        "rating": 4.9,
        "reviews": 255,
        "stars": 5,
        "stock": 19,
        "description": "Dr. Stone (ドクターストーン Dokutā Sutōn?), estilizado como Dr. STONE, es un manga de ficción post-apocalíptico escrito por Riichiro Inagaki (escritor de Eyeshield 21) e ilustrado por Boichi (autor de Sun-Ken Rock). La historia cuenta las aventuras de Senku y Taiju, dos adolescentes que se ven atrapados en un mundo post-apocalíptico en el que la raza humana se ha convertido en piedra y ellos buscan la manera de revertir la petrificación en la mayor cantidad de personas posibles, para así reconstruir la sociedad tal como la conocieron.  El manga que está publicándose desde el 6 de marzo de 2017 en las páginas de la revista Shūkan Shōnen Jump actualmente está recopilado en veintiuno Tankōbon hasta junio de 2021. La Editorial Ivrea ha licenciado el manga en España y se ha hecho la serie de anime con estreno de julio de 2019.",
        "id": 3
      },
      {
        "name": "Kaneki Figure",
        "price": 1200,
        "category": "figures",
        "img": "https://qph.fs.quoracdn.net/main-qimg-9ec57820b0ecb331f2bc18b32baac7e0",
        "colors": [
          "blue",
          "red",
          "green"
        ],
        "minimumStock": 1,
        "rating": 4.6,
        "reviews": 10,
        "stars": 5,
        "stock": 3,
        "description": "Ken Kaneki (金木 研かねき けん, Kaneki Ken?) es el protagonista principal de la serie Tokyo Ghoul y Tokyo Ghoul:re.  Anteriormente era un estudiante de literatura japonesa en la Universidad Kamii. Su vida cambio radicalmente después de tener un encuentro con un Ghoul del cual le transplantaron un riñon y otros órganos digestivos convirtiéndole en un Ghoul de un Ojo. Después de una serie de eventos, decide unirse a Anteiku como camarero de tiempo parcial, mientras trata de vivir una vida como un humano. Es nombrado por el CCG cómo Ojo Parchado (眼帯, Gantai?).",
        "id": 4
      },
      {
        "name": "Deku Midoriya",
        "price": 500,
        "category": "figures",
        "img": "https://bbts1.azureedge.net/images/p/full/2021/10/e8e6d87b-02b5-4f38-8277-0c222a6ef913.jpg",
        "colors": [
          "red",
          "blue",
          "green"
        ],
        "minimumStock": 1,
        "rating": 1,
        "reviews": 1,
        "stars": 1,
        "stock": 5,
        "description": "This a 1/5 scale figure of Deku Midoriya of BHA",
        "id": 5
      },
      {
        "name": "Hollow Knight",
        "price": 550,
        "category": "games",
        "img": "https://i.pinimg.com/originals/71/a9/23/71a92360cb0c1fc5ce6981685079ac2e.jpg",
        "colors": [
          "red",
          "blue",
          "green"
        ],
        "minimumStock": 1,
        "rating": 0,
        "reviews": 0,
        "stars": 0,
        "stock": 13,
        "description": "Beneath the fading town of Dirtmouth sleeps a vast, ancient kingdom. Many are drawn beneath the surface, searching for riches, or glory, or answers to old secrets. As the enigmatic Knight, you'll traverse the depths, unravel its mysteries and conquer its evils.",
        "id": 6
      }
    ],
    "id": 1
  }
}
```
</details>

---

- **DELETE api/carts/{id}**
    - Description: Delete the cart by id.
    - Parameters:
        - id: Cart id to be deleted.

<details>
<summary>Example</summary>

Response:
```
{
  "cartDeleted": {
    "timestamp": "12/11/2022, 12:40:46",
    "products": [
      {
        "name": "Kaneki Figure",
        "price": 1200,
        "category": "figures",
        "img": "https://qph.fs.quoracdn.net/main-qimg-9ec57820b0ecb331f2bc18b32baac7e0",
        "colors": [
          "blue",
          "red",
          "green"
        ],
        "minimumStock": 1,
        "rating": 4.6,
        "reviews": 10,
        "stars": 5,
        "stock": 3,
        "description": "Ken Kaneki (金木 研かねき けん, Kaneki Ken?) es el protagonista principal de la serie Tokyo Ghoul y Tokyo Ghoul:re.  Anteriormente era un estudiante de literatura japonesa en la Universidad Kamii. Su vida cambio radicalmente después de tener un encuentro con un Ghoul del cual le transplantaron un riñon y otros órganos digestivos convirtiéndole en un Ghoul de un Ojo. Después de una serie de eventos, decide unirse a Anteiku como camarero de tiempo parcial, mientras trata de vivir una vida como un humano. Es nombrado por el CCG cómo Ojo Parchado (眼帯, Gantai?).",
        "id": 4
      },
      {
        "name": "Deku Midoriya",
        "price": 500,
        "category": "figures",
        "img": "https://bbts1.azureedge.net/images/p/full/2021/10/e8e6d87b-02b5-4f38-8277-0c222a6ef913.jpg",
        "colors": [
          "red",
          "blue",
          "green"
        ],
        "minimumStock": 1,
        "rating": 1,
        "reviews": 1,
        "stars": 1,
        "stock": 5,
        "description": "This a 1/5 scale figure of Deku Midoriya of BHA",
        "id": 5
      }
    ],
    "id": 2
  }
}
```
</details>

---

- **DELETE api/carts/{id}/products/{productId}**
  - Description: Delete a product inside a cart based on id.
  - Parameters:
    - id: Cart id where the product is going to be removed from.
    - productId: Product id that is going to be removed from the cart.

<details>
<summary>Example</summary>

Response:
```
{
  "cartUpdated": {
    "timestamp": "12/11/2022, 15:22:10",
    "products": [
      {
        "name": "Kaneki Figure",
        "price": 1200,
        "category": "figures",
        "img": "https://qph.fs.quoracdn.net/main-qimg-9ec57820b0ecb331f2bc18b32baac7e0",
        "colors": [
          "blue",
          "red",
          "green"
        ],
        "minimumStock": 1,
        "rating": 4.6,
        "reviews": 10,
        "stars": 5,
        "stock": 3,
        "description": "Ken Kaneki (金木 研かねき けん, Kaneki Ken?) es el protagonista principal de la serie Tokyo Ghoul y Tokyo Ghoul:re.  Anteriormente era un estudiante de literatura japonesa en la Universidad Kamii. Su vida cambio radicalmente después de tener un encuentro con un Ghoul del cual le transplantaron un riñon y otros órganos digestivos convirtiéndole en un Ghoul de un Ojo. Después de una serie de eventos, decide unirse a Anteiku como camarero de tiempo parcial, mientras trata de vivir una vida como un humano. Es nombrado por el CCG cómo Ojo Parchado (眼帯, Gantai?).",
        "id": 4
      }
    ],
    "id": 3
  }
}
```
</details>
