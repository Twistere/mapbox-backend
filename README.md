
# ONF

Un site web qui permet de posistioner des images dynamiquement sur un plan MapBox.


## Installation

Pour installer le projet

```bash
  npm i
  prisma migrate dev --name init
  nohup node src/app.js &
```
    
## API Reference

#### Get all items

```http
  GET /image/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `image_id` | `iamge` | Affiche l'image souhaité |

#### Get item

```http
  GET /user/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `json` | Affiche tous les utilisateurs |


