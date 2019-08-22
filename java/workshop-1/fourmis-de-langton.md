# Fourmis de Langton

### La classe Fourmis

Cette classe hérite de la classe Automate. Vous pouvez ajouter les méthodes et les variables membres que vous désirez.

Qu’est-ce que la fourmi de Langton ? Cet automate fait déplacer une fourmi sur une grille de cases blanches ou noires. Au départ, toutes les cases sont blanches, et la fourmi change leur couleur sur son passage.

### Les règles d’évolution de la Fourmis de Langton

Voici les règles d’évolution de cet automate

* Si la fourmi est sur une case noire :
  * elle tourne de 90o vers la droite
  * change la couleur de la case pour blanc
  * avance d’une case.

Dans l’exemple suivant, on voit la fourmi qui arrive sur une case blanche, tourne à droite, et change la couleur de la case en noir :

![](../../.gitbook/assets/image%20%286%29.png)

* Si la fourmi est sur une case blanche :
  * elle tourne de 90o vers la gauche
  * change la couleur de la case pour noire
  * avance d’une case

La position et la direction initiale de la fourmi sont données aléatoirement. Donc au départ, elle est "quelque part" dans la grille, n’importe où. 

Il faut considérer que la grille est circulaire. Ainsi, si la fourmi veut aller à l’extérieur de la grille, elle réapparaîtra du côté opposé à la grille. Pensez à utiliser les modulos pour ça !

### Pour les couleurs

Dans le cas du programme exemple, les couleurs suivantes sont utilisées :

* Color.BLACK pour une cellule noire
* Color.WHITE pour une cellule vivante
* Color.RED pour la cellule sur laquelle se trouve la fourmi

### Petits conseils d’implantation

* Afin de savoir dans quelle direction la fourmi se déplace \(vers le bas, vers le haut, vers la gauche, vers la droite\), il faut retenir son orientation \(nord, sud, est, ouest ?\)
* N’oubliez pas de garder en mémoire la position de la fourmi dans votre classe !



