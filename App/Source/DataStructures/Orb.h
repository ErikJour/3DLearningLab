//
// Created by Erik Jourgensen on 5/4/26.
//

#ifndef MATHANDPHYSICS_ORB_H
#define MATHANDPHYSICS_ORB_H

class Orb
{

public:
    explicit Orb(int value);
    ~Orb();

    int value;
    Orb* next;
};

#endif //MATHANDPHYSICS_ORB_H