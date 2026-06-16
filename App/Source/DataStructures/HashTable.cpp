//
// Created by Erik Jourgensen on 6/1/26.
//

#include "HashTable.h"

#include <iostream>
#include <ostream>

HashTable::HashTable() : dataMap{} {}

HashTable::~HashTable() = default;

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

int HashTable::get(const std::string& key) const
{
    const int index = hashFunction(key);
    auto temp = dataMap[index];
    while (temp)
    {
        if (temp->key == key) return temp->value;
        temp = temp->next;
    }
    return 0;
}

std::vector<std::string> HashTable::keys() const
{
    std::vector<std::string> allKeys;

    for (auto temp : dataMap)
    {
        while (temp)
        {
            allKeys.push_back(temp->key);
            temp = temp->next;
        }
    }
    return allKeys;
}

bool HashTable::itemsInCommon(const std::vector<int>& vect1, const std::vector<int>& vect2)
{
    std::unordered_map<int, bool> hashMap;
    for (auto i : vect1)
    {
        hashMap.insert({i, true});
    }
    for (auto j : vect2)
    {
        if (hashMap[j]) return true;
    }
    return false;
}





