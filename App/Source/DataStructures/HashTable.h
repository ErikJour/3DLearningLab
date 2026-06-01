//
// Created by Erik Jourgensen on 6/1/26.
//

#ifndef MATHANDPHYSICS_HASHTABLE_H
#define MATHANDPHYSICS_HASHTABLE_H
#include "Node.h"


class HashTable
{
public:
    HashTable();
    ~HashTable();
    void printTable() const;
    static int hashFunction (const std::string& key);
    void set(const std::string& key, int value);

private:
    static constexpr int SIZE = 7;
    Node* dataMap[SIZE];
};


#endif //MATHANDPHYSICS_HASHTABLE_H