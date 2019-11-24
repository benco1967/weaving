
Dynamique
``` math
x[n+1]
V[n+1] = (x[n+1] - x[n]) Fe
A[n+1] = (V[n+1] - V[n]) Fe = (x[n+1] - 2 x[n] + x[n - 1]) Fe^2
```

```
mA = Sum(F)
```



- Liaison ressort  `F = k(x2 - x1)`
- Liaison visceuse `F = z(V2 - V1)`
- Viscosité de milieu `F = zV`


Cas d'une masse dans un milieu visceux
``` 
F + zV = mA
<=> F[n] + z Fe(x[n] - x[n-1]) = m (x[n+1] - 2 x[n] + x[n - 1]) Fe^2
<=> x[n+1] = (1/m Fe^2) * (F[n] + z Fe(x[n] - x[n-1])) + (2 x[n] - x[n - 1])
<=> x[n+1] = x[n] + (x[n] - x[n-1])(1 - z/mFe) + F[n] / (mFe^2)
```

Dans le cas d'un fil

- force de rappel dûe à la tension du fil avec les éléments précédent et suivant en chaine ou en trame
- force de non pénétration entre les deux fils se croisant
 