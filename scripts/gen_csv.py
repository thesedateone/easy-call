import csv
import argparse
from datetime import date
from random import randrange

from faker import Factory
from dateutil.relativedelta import relativedelta


TYPES = {
    'littlepony': 'import_littlepony.csv',
    'allthethings': 'import_allthethings.csv',
}

PONY_FIELDNAMES = [
    'Serial No', 'Title', 'First Name',
    'Last Name', 'Tel (day)', 'Mobile',
    'Address 1', 'Suburb', 'Town/City',
    'Postcode', 'Foo', 'Bar', 'Note - Rapport']

ALL_THE_FIELDNAMES = [
    'Serial No', 'Title', 'First Name', 'Middle Name',
    'Last Name', 'Suffix', 'Tel (day)', 'Tel (eve)',
    'Tel (work)', 'Mobile', 'Address 1', 'Address 2',
    'Address 3', 'Suburb', 'Town/City', 'Postcode',
    'Do Not Mail Reason', 'Date of Birth', 'Age',
    'Field1', 'Field2', 'Field3', 'Field4', 'Field5',
    'Field6', 'Field7', 'Field8', 'Field9', 'Field10',
    'Field11', 'Field12', 'Field13', 'Field14', 'Field15',
    'Field16', 'Field17', 'Field18', 'Field19', 'Field20',
    'Note - Rapport', 'Note - Procedural', 'Note - Approach']


def pick_field_names(data_type):
    if data_type == 'littlepony':
        return PONY_FIELDNAMES
    if data_type == 'allthethings':
        return ALL_THE_FIELDNAMES


def pick_row_gen(data_type):
    if data_type == 'littlepony':
        return gen_pony_row
    if data_type == 'allthethings':
        return gen_all_the_things_row


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


def gen_pony_row(fake):
    date_info = gen_dob()
    return {
        'Serial No': gen_id(),
        'Title': fake.prefix_female(),
        'First Name': fake.first_name(),
        'Last Name': fake.last_name(),
        'Tel (day)': "021766826",
        'Mobile': "0220856814",
        'Address 1': fake.street_address(),
        'Suburb': fake.city(),
        'Town/City': fake.city(),
        'Postcode': gen_post_code(),
        'Foo': fake.sentence(),
        'Bar': fake.sentence(),
        'Note - Rapport': fake.text(),  
    }


def gen_all_the_things_row(fake):
    date_info = gen_dob()
    return {
        'Serial No': gen_id(),
        'Title': fake.prefix_female(),
        'First Name': fake.first_name(),
        'Middle Name': "{} {}".format(fake.random_letter().upper(),
                                      fake.random_letter().upper()),
        'Last Name': fake.last_name(),
        'Suffix': fake.suffix_female(),
        'Tel (day)': fake.phone_number(),
        'Tel (eve)': fake.phone_number(),
        'Tel (work)': fake.phone_number(),
        'Mobile': fake.phone_number(),
        'Address 1': "CO: {}".format(fake.company()),
        'Address 2': "The {} building".format(fake.last_name()),
        'Address 3': fake.street_address(),
        'Suburb': fake.city(),
        'Town/City': fake.city(),
        'Postcode': gen_post_code(),
        'Do Not Mail Reason': fake.sentence(),
        'Date of Birth': date_info['dob'],
        'Age': date_info['age'],
        'Field1': fake.sentence(),
        'Field2': fake.sentence(),
        'Field3': fake.sentence(),
        'Field4': fake.sentence(),
        'Field5': fake.sentence(),
        'Field6': fake.sentence(),
        'Field7': fake.sentence(),
        'Field8': fake.sentence(),
        'Field9': fake.sentence(),
        'Field10': fake.sentence(),
        'Field11': fake.sentence(),
        'Field12': fake.sentence(),
        'Field13': fake.sentence(),
        'Field14': fake.sentence(),
        'Field15': fake.sentence(),
        'Field16': fake.sentence(),
        'Field17': fake.sentence(),
        'Field18': fake.sentence(),
        'Field19': fake.sentence(),
        'Field20': fake.sentence(),
        'Note - Rapport': fake.text(),
        'Note - Procedural': fake.text(),
        'Note - Approach': fake.text()
    }


if __name__ == '__main__':
    # Deal with command line params
    parser = argparse.ArgumentParser()
    parser.add_argument('--type', default='littlepony',
                        choices=TYPES.keys(),
                        help='What type of data do you need?')
    parser.add_argument('--size', default=15, type=int,
                        help='How many rows of data do you need? (positive int)')
    args = parser.parse_args()

    # Set up based on desired type of data
    fake = Factory.create()
    fieldnames = pick_field_names(args.type)
    row_gen = pick_row_gen(args.type)
    filename = TYPES[args.type]

    # Write the data
    with open(filename, 'w') as csvfile:
        writer = csv.DictWriter(csvfile, dialect='excel',
                                fieldnames=fieldnames,
                                delimiter=',', quotechar='"',
                                quoting=csv.QUOTE_ALL)
        writer.writeheader()
        for num in range(0, args.size):
            writer.writerow(row_gen(fake))


#   Faker methods that could come in handy later
#   fake.sentence()
#   fake.text()
