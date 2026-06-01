//
// Created by Erik Jourgensen on 6/1/26.
//

#include "HashTable.h"

#include <iostream>
#include <ostream>

HashTable::HashTable() : dataMap{}
{
}

HashTable::~HashTable()
{

}
void HashTable::printTable() const
{
    for (int i = 0; i < SIZE; i++)
    {
        std::cout << i << std::endl;
        if (dataMap[i])
        {
            const Node* temp = dataMap[i];
            while (temp)
            {
                std::cout << " { " << temp-> key << " , " << temp-> value << " }" << std::endl;
                temp = temp->next;
            }
        }
    }
}

int HashTable::hashFunction (const std::string& key)
{
    int hash = 0;
    for (int i = 0; i < static_cast<int>(key.length()); i++)
    {
        const int asciiValue = static_cast<int>(key[i]);
        hash = (hash + asciiValue * 23) % SIZE;
    }
    return hash;
}

void HashTable::set(const std::string& key, const int value)
{
    int index = hashFunction(key);
    const auto newNode = new Node(key, value);
    if (dataMap[index] == nullptr)
    {
        dataMap[index] = newNode;
    } else
    {
        Node* temp = dataMap[index];
        while (temp->next != nullptr)
        {
            temp = temp->next;
        }
        temp->next = newNode;
    }
}


