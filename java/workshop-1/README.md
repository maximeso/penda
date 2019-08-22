---
description: >-
  Vous allez faire un système de visualisation d’automates cellulaires. Bon,
  mais tout d’abord, c’est quoi un automate cellulaire ?
---

# Workshop 1

## Github

[https://github.com/Osedea/osedea\_training\_java-basic](https://github.com/Osedea/osedea_training_java-basic)

### Qu’est-ce qu’un automate ? 

Les automates en informatique sont définis comme étant des machines possédant un nombre fini d’états différents, et qui possèdent un système de transition entre les états. 

Par exemple, on pourrait définir un toaster comme étant une machine à états finis possédant les états suivants : 

* en attente
* cuisson
* contient des toasts cuites 

Et la suite de transition serait les suivantes : 

* Pour passer de : en attente à cuisson, un usager met des toasts dans le toaster et appuie sur le bouton pour lancer la cuisson 
* Pour passer de : cuit à contient des toasts cuites, on termine la cuisson des toasts et à ce moment, le toaster "pop" les toasts
* Pour passer de contient des toasts cuites à en attente, on enlève les toasts prêtes du toaster Ainsi, un toaster pourrait être modélisé par 3 états différents, et une possibilité de passer d’un état à un autre..

![](../../.gitbook/assets/image%20%2814%29.png)

### Mais un automate cellulaire, c’est quoi ?

Selon wikipedia :

> Un automate cellulaire consiste en une grille régulière de « cellules » contenant chacune un « état » choisi parmi un ensemble fini et qui peut évoluer au cours du temps. L’état d’une cellule au temps t+1 est fonction de l’état au temps t d’un nombre fini de cellules appelé son « voisinage ». À chaque nouvelle unité de temps, les mêmes règles sont appliquées simultanément à toutes les cellules de la grille, produisant une nouvelle « génération » de cellules dépendant entièrement de la génération précédente

Ce genre d’automate est utilisé pour étudier l’évolution d’une population, ou l’évolution d’autres systèmes complexes. Les modèles d’évolution des automates sont souvent simples, mais leur évolution et leur comportement font l’objet de beaucoup de recherches en mathématique et en informatique théorique depuis longtemps, et ce n’est pas fini !

Vous allez donc implanter 3 automates cellulaires différents :

* Le modèle très populaire appelé "Le jeu de la vie" : cet automate simule l’évolution cellulaire au niveau microscopique. Cet automate est constitué d’un ensemble de cellules mortes ou vivantes. Ces dernières meurent, vivent ou naissent en suivant certaines règles très simples. L’automate tend à avoir un état final stable avec des configurations de cellules vivantes/mortes qui oscillent. 
* Le modèle "Fourmis de Langton" : c’est un modèle qui est encore à l’étude. Cet automate est composé d’une fourmi qui se déplace dans une grille de cases noires et blanches. La fourmi change les couleurs des cases sur son passage.
* Le modèle "Feu et forêt" : c’est un modèle qui est utilisé pour modéliser les effets d’un feu dans une forêt.

### Description générale d’un automate cellulaire

Un automate est un tableau 2D de cellules. Chacune des cellules est caractérisée par un état. Par exemple, pour l’automate Jeu de la vie, chacune des cellules du tableau peut être dans 2 états possibles : vivante ou morte.

Chacune des cellules de l’automate peut changer d’état selon l’état de ses voisins et quelques règles définies par l’automate. À chaque temps t, on fait évoluer toutes les cellules de l’automate pour arriver au temps t + 1.

Ainsi, un automate est notamment caractérisé par sa méthode step\(\) qui fait évoluer chacune de ses cellules. Cette méthode vérifiera chacune de ses cellules, et leur attribuera un nouvel état selon les cellules qui lui seront voisines.

Voici une image de l’automate de la Fourmis, pour concrétiser un peu toutes ces explications.

![](../../.gitbook/assets/image%20%2827%29.png)

  
Ces deux images représentent l’automate aux temps t \(à droite\) et au temps t+1 \(à gauche\). La fourmis est représentée par un carré rouge. Chacun des carrés des grilles représentent une cellule de l’automate. Dans le cas de l’automate de la fourmis de Langton, les cellules sont soit blanches, soit noires ou finalement rouges pour indiquer la position de la fourmis.

### Mais comment on définit un état ?

Un état peut être représenté par un entier. Par exemple, vous pourriez caractériser un automate par un tableau 2D d’entiers. Chacun de ses entiers pourraient représenter l’état d’une cellule. Pour l’exemple de la fourmis :

* l’entier 0 pourrait indiquer que la cellule est blanche
* l’entier 1 pourrait indiquer que la cellule est noire
* l’entier 2 pourrait indiquer la cellule est la fourmis et que cette cellule sera dessinée en

  rouge

### Qu’est-ce qu’une cellule voisine ?

Le voisinage d’une cellule est composé de ces 8 cellules l’entourant :

![](../../.gitbook/assets/image%20%281%29.png)

Le voisinage de la cellule rouge est composées de toutes les cellules bleues.



