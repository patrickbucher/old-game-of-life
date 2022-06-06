# Game of Life

[_Conway's Game of Life_](https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens) ist eine mathematische Simulation von zellulären Automaten. Es basiert auf einem zweidimensionalen Gitter, das in Zellen unterteilt ist. Eine Zelle kann entweder lebendig oder tot sein. Der Zustand einer Zelle kann sich in jedem Zyklus ändern. Dies geschieht anhand der folgenden Regeln:

1. _Geburt_: Eine tote Zelle mit **drei** lebenden Nachbarn wird in der nächsten Generation leben.
2. _Überleben_: Eine lebende Zelle mit **zwei oder drei** Lebenden Nachbarn bleibt in der nächsten Generation am Leben.
3. _Tod durch Einsamkeit_: Eine lebende Zelle mit **weniger als zwei** lebenden Nachbarn wird in der nächsten Generation tot sein.
4. _Tod durch Überbevölkerung_: Eine lebende Zelle mit **mehr als drei** lebenden Nachbarn wird in der nächsten Generation tot sein.