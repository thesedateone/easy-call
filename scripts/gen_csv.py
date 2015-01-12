import csv
from datetime import date
from random import randrange

from faker import Factory
from dateutil.relativedelta import relativedelta


def gen_id():
    return "{0:08d}".format(randrange(1, 99999999))


def gen_post_code():
    return "{0:04d}".format(randrange(1, 9999))


def gen_dob():
    today = date.today()

    day = randrange(1, 29)
    month = randrange(1, 13)
    year = today.year
    years_ago = randrange(20, 85)

    start_date = date(year, month, day)
    dob = start_date - relativedelta(years=years_ago)

    age = relativedelta(today, dob).years

    return {'dob': dob, 'age': age}


def gen_row():
    date_info = gen_dob()
    return {
        'Serial No': gen_id(),
        'Title': fake.prefix(),
        'First Name': fake.first_name(),
        'Last Name': fake.last_name(),
        'Tel (day)': fake.phone_number(),
        'Tel (eve)': fake.phone_number(),
        'Mobile': fake.phone_number(),
        'Address 1': fake.street_address(),
        'Suburb': fake.city(),
        'Town/City': fake.city(),
        'Postcode': gen_post_code(),
        'Do Not Mail Reason': fake.sentence(),
        'Date of Birth': date_info['dob'],
        'Age': date_info['age']
    }

fake = Factory.create()
with open('import.csv', 'w') as csvfile:
    fieldnames = [
        'Serial No',
        'Title', 'First Name', 'Last Name',
        'Tel (day)', 'Tel (eve)', 'Mobile',
        'Address 1', 'Suburb', 'Town/City', 'Postcode',
        'Do Not Mail Reason',
        'Date of Birth', 'Age']
    writer = csv.DictWriter(csvfile, dialect='excel',
                            fieldnames=fieldnames,
                            delimiter=',', quotechar='"',
                            quoting=csv.QUOTE_ALL)

    writer.writeheader()
    for num in range(0, 5):
        writer.writerow(gen_row())


#   Faker methods that could come in handy later
#   fake.sentence()
#   fake.text()
