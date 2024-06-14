import pandas as pd


def modify_string(s):
    # print(s)
    items = s.split(";")
    # print(items)
    editedString = ''
    for item in items:
        # print(item)
        if (item.startswith('sk__') or 
            item.startswith('p__') or 
            item.startswith('c__') or 
            item.startswith('o__') or 
            item.startswith('f__') or 
            item.startswith('g__') or
            item.startswith('s__') or
            item.startswith('st__')):
            editedString += item + ';'

    # print(editedString)
    # print()
    if editedString.endswith(';'):
    # Remove the last character (which is ;)
        editedString = editedString[:-1]
    else:
        # If the string does not end with ;, keep it unchanged
        editedString = editedString

    # print(editedString)
    return editedString


# def nameMapping(val):
#     if (val == 's'):
#         return "species"
#     if (val == 'g'):
#         return "genus"
#     if (val == 'f'):
#         return "family"
#     if (val == 'o'):
#         return "order"
#     if (val == 'c'):
#         return "class"
#     if (val == 'p'):
#         return "phylum"
#     if (val == 'sk'):
#         return "superkingdom"
    

# def modify_based_on_row(row):
#     if (row['taxon_rank_level'] != "phylum" and row['taxon_rank_level'] != 'class'
#         and row['taxon_rank_level'] != "order" and row['taxon_rank_level'] != "family"
#         and row['taxon_rank_level'] != "genus" and row['taxon_rank_level'] != "species"
#         and row['taxon_rank_level'] != "strain"):
        
#         myString = row['lineage']
#         last_semicolon_index = myString.rfind(';')
#         substring_after_last_semicolon = myString[last_semicolon_index + 1:]
#         substring_after_last_double_underscore = substring_after_last_semicolon.rsplit('__', 1)[-1]
#         row['ncbi_taxon_id'] = substring_after_last_double_underscore
#         return row['ncbi_taxon_id']
#     else:
#         return row['ncbi_taxon_id']
    

# def modify_based_on_row_2(row):
#     if (row['taxon_rank_level'] != "phylum" and row['taxon_rank_level'] != 'class'
#         and row['taxon_rank_level'] != "order" and row['taxon_rank_level'] != "family"
#         and row['taxon_rank_level'] != "genus" and row['taxon_rank_level'] != "species"
#         and row['taxon_rank_level'] != "strain"):
        
#         myString = row['lineage']
#         last_semicolon_index = myString.rfind(';')
#         substring_after_last_semicolon = myString[last_semicolon_index + 1:]
#         substring_between_double_underscores = substring_after_last_semicolon.split('__')[1]
#         row['name'] = substring_between_double_underscores
#         return row['name']
#     else:
#         return row['name']



# def modify_based_on_row_3(row):
#     if (row['taxon_rank_level'] != "phylum" and row['taxon_rank_level'] != 'class'
#         and row['taxon_rank_level'] != "order" and row['taxon_rank_level'] != "family"
#         and row['taxon_rank_level'] != "genus" and row['taxon_rank_level'] != "species"
#         and row['taxon_rank_level'] != "strain"):
        
#         myString = row['lineage']
#         last_semicolon_index = myString.rfind(';')
#         substring_after_last_semicolon = myString[last_semicolon_index + 1:]
#         first_double_underscore_index = substring_after_last_semicolon.find('__')
#         substring_before_first_double_underscore = substring_after_last_semicolon[:first_double_underscore_index]
#         row['taxon_rank_level'] = nameMapping(substring_before_first_double_underscore)
#         return row['taxon_rank_level']
#     else:
#         return row['taxon_rank_level']





def main():
    filename = "SRR6474279_Healthy"
    inputFileName = "initialCSVs/"+filename+".csv"
    df = pd.read_csv(inputFileName)
    df['lineage'] = df['lineage'].apply(modify_string)
    # print(df['lineage'])

    values_to_keep = ['phylum', 'class', 'order', 'family', 'genus', 'species', 'strain']

    df_filtered = df[df['taxon_rank_level'].isin(values_to_keep)]



    # df['ncbi_taxon_id'] = df.apply(modify_based_on_row, axis=1)
    # # print(df)
    # df['name'] = df.apply(modify_based_on_row_2, axis=1)
    # # print(df)
    # df['taxon_rank_level'] = df.apply(modify_based_on_row_3, axis=1)
    # print(df)
    
    outputFileName = "CSVswithStandardRanks/"+filename+".csv"
    df_filtered.to_csv(outputFileName, index=False)





if __name__ == "__main__":
    main()