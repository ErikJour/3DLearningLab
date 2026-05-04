//
// Created by Erik Jourgensen on 5/4/26.
//

#include "LinkedOrbs.h"

#include <ios>

LinkedOrbs::LinkedOrbs(const int value)
{
    const auto newOrb = new Orb(value);
    head = newOrb;
    tail = newOrb;
    length = 1;
}
