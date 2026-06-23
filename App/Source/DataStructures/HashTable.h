//
// Created by Erik Jourgensen on 6/1/26.
//

#ifndef MATHANDPHYSICS_HASHTABLE_H
#define MATHANDPHYSICS_HASHTABLE_H
#include "Node.h"
#include <vector>


class HashTable
{
public:
    HashTable();
    ~HashTable();
    void printTable() const;
    static int hashFunction (const std::string& key);
    void set(const std::string& key, int value);
    [[nodiscard]] int get(const std::string& key) const;
    [[nodiscard]] std::vector<std::string> keys() const;
    static bool itemsInCommon(const std::vector<int>& vect1, const std::vector<int>& vect2);
    static std::vector<int> findDuplicates(const std::vector<int>& nums);

private:
    static constexpr int SIZE = 7;
    Node* dataMap[SIZE];
};


#endif //MATHANDPHYSICS_HASHTABLE_H