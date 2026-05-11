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
        ~LinkedOrbs();
        [[nodiscard]] int getHead() const;
        [[nodiscard]] int getTail() const;
        [[nodiscard]] int getLength() const;
        void append(int value);
        void deleteLast();
        void prepend(int value);
        void deleteFirst();
        [[nodiscard]] Orb* get(int index) const;
        [[nodiscard]] bool set(int index, int value) const;
        bool insert(int value, int index);
        void deleteOrb(int index);
        void reverse();

        Orb* head;
        Orb* tail;
        int length;


    private:

};


#endif //MATHANDPHYSICS_LINKEDORBS_H