//
// Created by Erik Jourgensen on 5/4/26.
//

#ifndef MATHANDPHYSICS_LINKEDORBS_H
#define MATHANDPHYSICS_LINKEDORBS_H
#import "Orb.h"

class LinkedOrbs
{
    public:
        explicit LinkedOrbs(int value);
        ~LinkedOrbs() = default;

    private:
        Orb* head;
        Orb* tail;
        int length;
};


#endif //MATHANDPHYSICS_LINKEDORBS_H