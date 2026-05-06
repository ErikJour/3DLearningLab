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

int LinkedOrbs::getTail() const
{
    return tail->value;
}

int LinkedOrbs::getLength() const
{
    return length;
}

void LinkedOrbs::append(const int value)
{
    const auto newOrb = new Orb(value);
    if (tail)
    {
        tail->next = newOrb;
        tail = newOrb;
    }
    else
    {
        head = newOrb;
        tail = newOrb;
    }
    length++;
}

void LinkedOrbs::deleteLast()
{
    if (length == 0) return;

    Orb* temp = head;

    if (length == 1)
    {
        head = nullptr;
        tail = nullptr;
    }
    else
    {
        Orb* pre = head;
        while (temp-> next)
        {
            pre = temp;
            temp = temp->next;
        }
        tail = pre;
        tail->next = nullptr;
    }
    delete temp;
    length--;
}

void LinkedOrbs::prepend(const int value)
{
    const auto newOrb = new Orb(value);
    newOrb->next = head;
    head = newOrb;
    length++;
}

void LinkedOrbs::deleteFirst()
{
    if (length == 0) return;
    const Orb* temp = head;
    if (length == 1) {
        head = nullptr;
        tail = nullptr;
    }
    else
    {
        head = head->next;
    }
    delete temp;
    length--;
}

Orb* LinkedOrbs::get(const int index) const
{
    if (index == 0 || index >= length) return nullptr;
    Orb* temp = head;
    for (int i = 0; i < index; i++)
    {
        temp = temp->next;
    }
    return temp;
}

bool LinkedOrbs::set(const int index, const int value) const
{
    if (Orb* temp = get(index))
    {
        temp->value = value;
        return true;
    }
    return false;
}






