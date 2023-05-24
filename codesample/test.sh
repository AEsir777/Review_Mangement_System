#!/bin/sh

CLASSDIR="$(pwd)"

### Prepareation (same as Assignment 2 Part II)
# You may comment them out if you don't need to use them
MTEST1_DATDIR="$(pwd)/Database/testdb/"
cd $MTEST1_DATDIR
db2 -stvf connectCS348.sql
db2 -stvf droptables.sql
db2 -stvf createtables.sql
db2 -stvf populatetables.sql

### Testing script for CS348 W18 A2
cd $CLASSDIR

## Compile source code
CLASSFILE1="MaintainDB.class"
CLASSFILE2="QueryDB.class"
if [ \( -f $CLASSFILE1 \) -a \( -f $CLASSFILE2 \) ] 
then
   rm $CLASSFILE1
   rm $CLASSFILE2
   echo "Clean class files"
fi

chmod +x compile
./compile 

## Check for *.class output
if ! [ \( -f $CLASSFILE1 \) -a \( -f $CLASSFILE2 \) ] 
then 
    echo "CLASS FILE NOT Found. ABORT"
    exit 1 
else 
    echo "TEST 1 STARTS..."
fi


## Run functions in QueryDB.class
QTEST1="java QueryDB"
$QTEST1 << INPUT
1
112348546
2
112348546
Database Systems, Operatring System Design
3
Database Systems
0
INPUT




## Run functions in MaintainDB.class
MTEST1="java MaintainDB"
$MTEST1 << INPUT
1
Data Privacy, MWF 14, R129, 242518965
2
1
0
INPUT 

sleep 2

