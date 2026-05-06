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
        Orb* get(const int index) const;
        bool set(const int index, const int value) const;
        Orb* head;
        Orb* tail;
        int length;


    private:

};


#endif //MATHANDPHYSICS_LINKEDORBS_H