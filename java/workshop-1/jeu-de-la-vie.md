# Jeu de la vie

### La classe JeuDeLaVie

Cette classe hérite de la classe Automate. Vous pouvez ajouter les méthodes et les variables membres que vous désirez.

Le jeu de la vie est un ensemble de cellules vivantes ou mortes, qui naissent, meurent ou demeurent vivantes selon l’état des cellules voisines.

### Règles d’évolution de l’automate

Voici les règles d’évolution qui devront être implantées dans la fonction Step\(\) :

#### Une cellule morte possédant exactement trois voisines vivantes devient vivante. Dans la figure suivante, les cellules mortes sont bleues, et les cellules blanches sont vivantes.

On voit des exemples de configuration où une cellule morte\(encadrée en rouge\) renaît, puisqu’elle a trois voisines vivantes.

![](../../.gitbook/assets/image%20%282%29.png)

#### Une cellule vivante ayant moins de deux voisines vivantes meure pour cause de manque de population. Voici des exemples de configuration où la cellule encadrée en rouge mourra.

![](../../.gitbook/assets/image%20%2825%29.png)

#### Finalement, une cellule vivante qui a DEUX ou TROIS voisines vivantes, reste en vie.

### Initialisation de l’automate

L’automate sera initialisé aléatoirement. Il vous faudra donc initialiser chacune des cellules à un état vivant ou mort. Les cellules auront une certaine probabilité d’être vivante initialement. Dans l’exécutable exemple que je vous donne, cette probabilité est de 0.1.

### Pour les couleurs

Dans le cas du programme exemple, les couleurs suivantes sont utilisées :

* Color.BLUE pour une cellule morte
* Color.WHITE pour une cellule vivante

