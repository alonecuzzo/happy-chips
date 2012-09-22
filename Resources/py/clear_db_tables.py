#!/usr/bin/python
# -*- coding: utf-8 -*-

import sqlite3 as lite
import sys

con = None

try:
    con = lite.connect('../purchases.sqlite')
    
    cur = con.cursor()    
    cur.execute('drop table if exists categories;')
    cur.execute('drop table if exists users;')
    cur.execute('drop table if exists purchase_categories;')
    cur.execute('drop table if exists limits;')
    cur.execute('drop table if exists limit_types;')
    cur.execute('drop table if exists purchases;')
    cur.execute('drop table if exists emotions;')
    
    print "tables dropped"   
    
    #add defaults and tables
    #cur.execute('.read sql/create_table.sql')
    #cur.execute('.read sql/add_defaults.sql')             
    
except lite.Error, e:
    
    print "Error %s:" % e.args[0]
    sys.exit(1)
    
finally:
    
    if con:
        con.close()