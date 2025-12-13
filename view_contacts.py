#!/usr/bin/env python3
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime

load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI')
client = MongoClient(MONGODB_URI)
db = client['hollanda-rehberi']
collection = db['contacts']

print("\n" + "="*80)
print("📬 KONTAKT FORM MESAJLARI")
print("="*80 + "\n")

contacts = collection.find().sort('_id', -1)
count = 0

for contact in contacts:
    count += 1
    print(f"📧 Mesaj #{count}")
    print(f"   Ad/Soyad: {contact.get('name', 'N/A')}")
    print(f"   E-posta: {contact.get('email', 'N/A')}")
    print(f"   Konu: {contact.get('subject', 'N/A')}")
    print(f"   Mesaj: {contact.get('message', 'N/A')[:100]}..." if len(contact.get('message', '')) > 100 else f"   Mesaj: {contact.get('message', 'N/A')}")
    
    created_at = contact.get('createdAt')
    if created_at:
        print(f"   Tarih: {created_at.strftime('%d.%m.%Y %H:%M:%S')}")
    print()

print("="*80)
print(f"Toplam mesaj sayısı: {count}")
print("="*80 + "\n")

client.close()
