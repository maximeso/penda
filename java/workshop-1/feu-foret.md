# Feu Foret

### La classe ForetFeu

Cet automate simule une forêt qui risque de prendre en feu pour cause de \(par exemple\), d’un éclair. Il comporte trois états :

* Vide : la cellule ne contient aucun arbre et aucun feu
* Arbre : la cellule contient un arbre
* Feu : la cellule est en feu

### Les règles d’évolution de l’automate ForetFeu

Voici les règles d’implantation de l’automate

* Une cellule vide devient un arbre avec une probabilité "parbre"
* Une cellule en feu devient une cellule vide au prochain pas de l’automate
* Une cellule arbre devient :
  * du feu avec une probabilité "ppropagation" si un de ses voisins brûlent.
  * du feu avec une probabilité "pfeu".

Les probabilités "parbre", "ppropagation" et "pfeu" peuvent être déterminées par l’utilisateur à partir de l’interface graphique fournie.

Au départ, toutes les cases de la grille sont considérées "vides". Le constructeur de cette classe est différent de celui de la super classe Automate. Voici comment il est défini :

```java
public FeuForet(int taille, float probFire, float probTree, float probPropagation)
```

* taille : est la taille de l’automate, comme pour le constructeur de la class Automate.
* probFire : est la probabilité qu’il y ait un feu
* probTree : est la probabilité qu’un arbre pousse
* probPropagation : est la probabilité de propagation d’un feu déjà allumé.

Ces variables seront initialisées dans l’interface graphique, et passé par le constructeur à partir du code déjà fourni.

### Pour les couleurs

Dans le cas du programme exemple, les couleurs suivantes sont utilisées :

* Color.LIGHT\_GREY pour une cellule vide
* Color.GREEN pour une cellule contenant un arbre
* Color.RED pour une cellule en feu



