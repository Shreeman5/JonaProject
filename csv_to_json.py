import json
import csv
import pandas as pd



def process_rows(filename, start_column):
    df = pd.read_csv(filename)
    rows_strings = []
    for index, row in df.iterrows():
        # Find index of last non-empty cell
        end_column = len(row)
        while end_column > 0 and pd.isnull(row[end_column - 1]):
            end_column -= 1
        # Append data from start_column to end_column for this row and join into a string
        row_data = row.iloc[start_column - 1:end_column].tolist()
        row_string = ';'.join(map(str, row_data))
        row_string = row_string.rsplit(';', 1)[0]
        rows_strings.append(row_string)
    return rows_strings

def modify_lineage_strings(lineage_strings):
    modified_lineage_strings = []
    for i in range(len(lineage_strings)):
        lineage_string = lineage_strings[i]
        last_part_Lineage_string = lineage_string.split(';')[-1]
        if (last_part_Lineage_string.startswith("st__")):
            parts = lineage_string.rsplit(';', 1)
            modified_lineage_strings.append(parts[0])
        else:
            modified_lineage_strings.append(lineage_string)

    return modified_lineage_strings


def process_rows_2(filename):
    df = pd.read_csv(filename)
    column_data_5 = df['name'] 
    column_data_3 = df['taxon_rank_level']
    # print(column_data_3)
    column_data_2 = df['ncbi_taxon_id'].astype(str)
    # print(column_data_2)
    return column_data_5 + '?' + column_data_3 + '?' + column_data_2


def process_rows_3(filename):
    df = pd.read_csv(filename)
    column_data_4 = df['relative_abundance'] 
    return column_data_4


def mergeLineageNameAbundance(array1, array2, array3):
    merged_array = []
    for item1, item2, item3 in zip(array1, array2, array3):
        merged_array.append(item1 + ";" + item2 + "--" + format(item3, '.15f'))
    return merged_array

# def mergeLineageNameAbundance(array1, array2):
#     merged_array = []
#     for item1, item2 in zip(array1, array2):
#         merged_array.append(item1 + "--" + format(item2, '.15f'))
#     return merged_array


def create_json_from_lineage(lineage):
    nested_json = {}
    current_level = nested_json

    levels = lineage.split('--')[0].split(';')
    weight = float(lineage.split('--')[1])

    for idx, level in enumerate(levels):
        if idx == len(levels) - 1:  # Last level (leaf)
            current_level[level] = weight
        else:
            current_level[level] = {}
            current_level = current_level[level]

    return nested_json

def merge_json_trees(tree1, tree2):
    for key, value in tree2.items():
        if key in tree1 and isinstance(value, dict):
            merge_json_trees(tree1[key], value)
        else:
            tree1[key] = value
    return tree1

def convert_to_hierarchical(data):
    if isinstance(data, dict):
        key = next(iter(data))
        children = [{"name": k, "value": v} if isinstance(v, (float, int)) else convert_to_hierarchical({k: v}) for k, v in data[key].items()]
        return {"name": key, "children": children}
    elif isinstance(data, float) or isinstance(data, int):
        return data
    

def find_level_2_node(node):
    if "children" in node:
        # If the current node has two or more children, return it
        if len(node["children"]) >= 2:
            return node
        # Otherwise, recursively search for level 2 node
        for child in node["children"]:
            level_2_node = find_level_2_node(child)
            if level_2_node:
                return level_2_node
    return None

def transform_level_2_to_root(data):
    level_2_node = find_level_2_node(data)
    if level_2_node:
        # Replace the root node with the level 2 node
        return level_2_node
    else:
        # If no level 2 node found, return original data
        return data
    
# def readfiles(filename):
#     df = pd.read_csv(filename)
#     column_data_6 = df['CDF'] 
#     print(column_data_6)




def main():
    fileName = "SRR6474279_Healthy"

    # readfiles("CSVs/CSVswithStandardRanks/"+fileName+".csv")



    lineage_strings = process_rows("CSVs/CSVswithStandardRanks/"+fileName+".csv", 6)  # Process each row from column 5 until the last non-empty column
    # print(lineage_strings[0])
    modified_lineage_strings = modify_lineage_strings(lineage_strings)
    # print(modified_lineage_strings[0])
    name_strings = process_rows_2("CSVs/CSVswithStandardRanks/"+fileName+".csv")
    # print(name_strings[0])
    abundance_numbers = process_rows_3("CSVs/CSVswithStandardRanks/"+fileName+".csv")
    # print(abundance_numbers)


    # merged_array = mergeLineageNameAbundance(lineage_strings, name_strings, abundance_numbers)
    merged_array = mergeLineageNameAbundance(modified_lineage_strings, name_strings, abundance_numbers)
    print(merged_array[0])
    
    startingTree = create_json_from_lineage(merged_array[0])
    startingTree2 = create_json_from_lineage(merged_array[1])
    combinedTree = merge_json_trees(startingTree, startingTree2)
    for i in range(2, len(merged_array)):
        currentTree = create_json_from_lineage(merged_array[i])
        combinedTree =  merge_json_trees(combinedTree, currentTree)
        
    # print(json.dumps(combinedTree, indent=2))
    hierarchical_data = convert_to_hierarchical(combinedTree)

    # print(json.dumps(hierarchical_data, indent=2))

    # # print(f"JSON data has been saved to '{file_path}'.")
    # transformed_data = transform_level_2_to_root(hierarchical_data)


    # # Print the transformed data
    # # print(json.dumps(transformed_data, indent=2))


    file_path = "/home/shreeman/Desktop/Jona Inc/HierarchyViz/JSONswithStandardRanks/BetterIndivJSONfiles/"+fileName+".json"

    # Write hierarchical data to the JSON file
    with open(file_path, "w") as json_file:
        json.dump(hierarchical_data, json_file, indent=4)
    

if __name__ == "__main__":
    main()


















