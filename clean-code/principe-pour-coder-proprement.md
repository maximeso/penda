# Principe pour coder proprement

## Les principes à retenir pour coder proprement

Suite à la lecture de ce livre, je vous ai préparé une liste de règles que vous pouvez appliquer immédiatement à votre code. J’ai choisi des règles qui me semblent importantes, mais bien sûr, je n’ai pas extrait toutes les règles dont il parle dans son livre.

### Utiliser des noms significatifs

L’idée qui apparaît est tout simplement qu’il faut bien nommer ses variables, ses classes et ses méthodes.

Cela peut sembler évident et pourtant je pense que cette étape est difficile. Je vois souvent du code avec des noms du genre « Manager ». Mais au final, qu’est-ce qu’un manager ? Que fait-il vraiment dans le code?

Cette règle énonce donc qu’il faut réfléchir aux noms. Un peu comme pour un bébé : prenez le temps de la réflexion, car le nom va rester durant toute la vie du projet.

Une manière simple de trouver un bon nom est de chercher à définir l’intention d’une variable ou d’une méthode. Il faut que la lecture de son nom puisse immédiatement nous dire ce qu’elle fait dans le code.

### Avoir des fonctions courtes

Cette règle est aussi simple à mettre en oeuvre et pourtant je vois souvent des fonctions énormes.

Quelle est la définition de courte ? Et bien d’après l’auteur, il faut écrire des fonctions qui font une seule chose. Sur ce point, je suis d’accord avec lui à 100%. La responsabilité unique est un bon principe à respecter.

### Des commentaires pour compléter le code

L’auteur exprime son point de vue sur les commentaires et il faut dire je suis tout à faire d’accord avec lui.

Selon Robert C Martin, il faut commenter uniquement le code qui en a vraiment besoin.

La règle énonce donc que les commentaires doivent être écrits uniquement s’ils permettent de comprendre du code \(c’est-à-dire que si vous supprimez le commentaire, il faudra sûrement plusieurs minutes pour comprendre le code, alors oui le commentaire à du sens\).

Les choses évidentes comme « cette fonction retourne un utilisateur » ne sont pas très utiles selon lui.

### Ecrire comme dans un journal

Cette règle prend tout son sens quand on repense au fait que le dévelopeur est aussi un auteur. Selon Robert C. Martin, il faut écrire du code comme dans un journal avec une suite d’articles.

Chaque article \(=une fonction\) fait référence à un article suivant \(=une autre fonction\).

Ainsi, votre code sera composé d’une série d’articles qui se suivent.

### Utiliser les exceptions à la place des codes de retour

Cette règle se base sur un principe simple : utiliser des codes de retour est souvent source d’erreurs, car les développeurs ne les vérifient pas forcément.

De plus, les codes de retour obligent à écrire des conditions supplémentaires dans le code \(if … else\). Cela va donc compliquer un algorithme et en réduire sa lisibilité.

Les exceptions sont des mécanismes qui ont été crées pour gérer les erreurs, autant donc les utiliser.

### Les tests unitaires doivent être aussi propres que le code de production

Etant donné qu’il va falloir maintenir les tests unitaires, il est donc logique que ces tests doivent être rédigés de manière propre comme s’il s’agissait de code que vous allez mettre en production.

Pour écrire des tests, Robert C. Martin indique qu’il faut respecter l’acronyme **FIRST** :

* **Fast \(Rapide\)** : Les tests doivent être rapides pour qu’ils soient lancés régulièrement,
* **Independant \(Indépendant\)** : Les tests doivent pouvoir être lancés dans n’importe quel ordre,
* **Repeatable \(Reproductible\)** : Les tests doivent pouvoir être reproduits dans n’importe quel environnement \(votre poste de dev, la recette ou même la production si nécessaire\), Self-Validating \(Auto validant\) : Les tests doivent avoir un résultat binaire \(succès ou échec\),
* **Timely \(Au moment opportun\)** : Les tests doivent être écrits juste avant le code de production. Si vous écrivez les tests après, vous remarquerez qu’il sera assez difficile de tester le code de production.

### Toujours écrire de petites classes

La taille d’une classe doit toujours être égale à 1. Mais un quoi ? Quelle est l’unité ? En fait, l’unité est la responsabilité. Chaque classe doit donc avoir une seule responsabilité.  
Respectez toujours le principe SRP.

Il donne une astuce : une classe courte doit pouvoir être décrite en 25 mots environ sans utiliser « si », « et », « ou » et « mais ».

