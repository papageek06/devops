db = db.getSiblingDB('blog_db');

db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'content', 'author'],
      properties: {
        title:   { bsonType: 'string' },
        content: { bsonType: 'string' },
        author:  { bsonType: 'string' }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'error'
});

db.posts.insertMany([
  {
    title: 'Introduction à Docker',
    content: 'Docker est une plateforme de conteneurisation qui permet d\'empaqueter des applications dans des conteneurs isolés et reproductibles.',
    author: 'Marc Admin',
    created_at: new Date()
  },
  {
    title: 'Docker Compose en pratique',
    content: 'Docker Compose permet d\'orchestrer plusieurs conteneurs avec un seul fichier YAML et une seule commande.',
    author: 'Marc Admin',
    created_at: new Date()
  },
  {
    title: 'Les réseaux Docker',
    content: 'Les réseaux Docker permettent aux conteneurs de communiquer entre eux de manière sécurisée et isolée.',
    author: 'Marc Admin',
    created_at: new Date()
  },
  {
    title: 'Les volumes Docker',
    content: 'Les volumes permettent la persistance des données au-delà du cycle de vie des conteneurs, évitant toute perte de données.',
    author: 'Marc Admin',
    created_at: new Date()
  },
  {
    title: 'Healthchecks et politiques de redémarrage',
    content: 'Les healthchecks permettent de surveiller l\'état des services et d\'orchestrer les dépendances avec condition: service_healthy.',
    author: 'Marc Admin',
    created_at: new Date()
  }
]);

print('blog_db initialized: 5 posts inserted.');
