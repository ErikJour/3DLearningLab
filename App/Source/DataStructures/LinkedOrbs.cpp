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

LinkedOrbs::~LinkedOrbs()
{
    const Orb* temporary = head;

    while (temporary)
    {
        temporary = temporary->next;
        delete temporary;
        temporary = head;
    }
}

int LinkedOrbs::getHead() const
{
    return head->value;
}


