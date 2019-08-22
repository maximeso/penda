---
description: On les nomme également structures « répétitives » ou « boucles ».
---

# Structures itératives

### While

Répéter un bloc d'instructions tant qu'une certaine condition est respectée. 

#### **Exemple 1 : Affichage des nombres pairs entre 1 et 10** 

```java
int nombre = 2; 
while (nombre <= 10) { 
    System.out.println(nombre); nombre += 2; 
} 
```

#### **Exemple 2 : Lecture de 5 noms au clavier et on les affiche en majuscules** 

```java
int nbNom = 0;
String nom;
while (nbNom < 5) {
    System.out.print("Entrez un nom : ");
    nom = Keyboard.readString();S
    ystem.out.println(nom.toUpperCase());
    nbNom++;
}
```

### **Do-While** 

Répéter un bloc d'instructions une première fois puis, tant qu'une certaine condition est respectée, le répéter à nouveau. 

#### **Exemple : Lire le choix de l’utilisateur jusqu’à ce qu’il entre un choix valide** 

```java
char reponse; 
do { 
    System.out.println("Votre choix (P ou F) : ");
    reponse = Keyboard.readChar(); 
} while (reponse != 'P' && reponse != 'F');
```

### **For** 

Répéter un bloc d'instructions un nombre prédéterminé de fois. 

#### **Exemple 1 : Affichage des nombres pairs entre 1 et 10** 

```java
for (int i=2; i<=10; i+=2) {
     System.out.print(i + " ");
}
// Ce code affichera "2 4 6 8 10"
```

#### **Exemple 2 : Faire le décompte de 10 à 0 pour le lancement de la fusée** 

```java
for (int decompte=10; decompte>=0; decompte--) {
    System.out.println(decompte);
}
System.out.println("Decollage...");
```

#### **Exemple 3 : Retirer toutes les voyelles d’un mot** 

```text
String leMot = "bonjour";
for (int i=0; i<leMot.length(); i++) {
    if ((leMot.charAt(i) != 'a') &&
        (leMot.charAt(i) != 'e') &&
        (leMot.charAt(i) != 'i') &&
        (leMot.charAt(i) != 'o') &&
        (leMot.charAt(i) != 'u') &&
        (leMot.charAt(i) != 'y')) {
        System.out.print(leMot.charAt(i));
    }
}
// Ce code affichera "bnjr"
```

### **Les instructions "break" et "continue" dans les boucles** 

#### **Break** 

Il arrive parfois que l'on veuille **interrompre complètement** l'exécution d'une boucle car une situation particulière a été rencontrée. 

L'instruction "**break**" permet d'arrêter l'exécution d'une boucle et de poursuivre avec l'instruction qui suit la fin de la boucle 

#### **Continue** 

Il arrive parfois que l'on veuille interrompre l'exécution de l'**itération en cours seulement** car une situation particulière a été rencontrée. 

L'instruction "**continue**" permet d'arrêter l'exécution de la boucle courante et d'enchaîner immédiatement avec la prochaine itération. 

