//
// Created by Erik Jourgensen on 5/4/26.
//

#include "LinkedOrbs.h"

#include <ios>
#include <iostream>
#include <ostream>

LinkedOrbs::LinkedOrbs(const int value)
{
    const auto newOrb = new Orb(value);
    head = newOrb;
    tail = newOrb;
    length = 1;
}

LinkedOrbs::~LinkedOrbs()
{
    while (head)
    {
        const Orb* temp = head;
        head = head->next;
        delete temp;
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
    std::cout << "Deleting last" << std::endl;
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
    if (index < 0 || index >= length) return nullptr;
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

bool LinkedOrbs::insert(const int value, const int index)
{
    if (index < 0 || index > length)
    {
        return false;
    }
    if (index == 0)
    {
        prepend(value);
        return true;
    }
    if (index == length)
    {
        append(value);
        return true;
    }
    const auto newOrb = new Orb(value);
    Orb* temp = get(index - 1);
    newOrb->next = temp->next;
    temp->next = newOrb;
    length++;
    return true;
}

void LinkedOrbs::deleteOrb(const int index)
{
    if (index < 0 || index >= length)
    {
        return;
    }
    if (index == 0)
    {
        return deleteFirst();
    }
    if (index == length - 1)
    {
        return deleteLast();
    }
    Orb* previous = get(index - 1);
    const Orb* temp = previous->next;
    previous->next = temp->next;
    delete temp;
    length--;
}

void LinkedOrbs::reverse()
{
    Orb* temp = head;
    head = tail;
    tail = temp;

    Orb* before = nullptr;
    Orb* after = nullptr;

    for (int i = 0; i < length; i++)
    {
        after = temp->next;
        temp->next = before;
        before = temp;
        temp = after;
    }
}

int LinkedOrbs::findMiddleOrb() const
{
    const Orb* fast = head;
    const Orb* slow = head;
    while (fast && fast->next)
    {
        fast = fast->next->next;
        slow = slow->next;
    }
    std::cout << slow->value << std::endl;
    return slow->value;
}

int LinkedOrbs::kthOrbFromEnd(const int index) const
{
    if (index == 0)
    {
        return 0;
    }

    const Orb* fast = head;

    for (int i = 0; i < index; i++)
    {
        fast = fast->next;
    }

    const Orb* slow = head;
    while (fast)
    {
        slow = slow->next;
        fast = fast->next;
    }
    return slow->value;
}










