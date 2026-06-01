//
// Created by Erik Jourgensen on 6/1/26.
//

#ifndef MATHANDPHYSICS_NODE_H
#define MATHANDPHYSICS_NODE_H
#include <string>

class Node
{
    public:
        std::string key;
        int value;
        Node* next;

    Node(std::string key, int value)
    {
        this->key = key;
        this->value = value;
        next = nullptr;
    }
};

#endif //MATHANDPHYSICS_NODE_H