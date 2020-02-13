from random import randint
def test_concept():
    z = randint(0, 12) * 2.56
    if z > 20:
        item1 = "bleach"
    elif z > 15:
        item1 = "salt"
    elif z > 10:
        item1 = "dirt"
    else:
        item1 = "water"

    z = randint(0, 12) * 2.56
    if z > 20:
        item2 = "bleach"
    elif z > 15:
        item2 = "salt"
    elif z > 10:
        item2 = "dirt"
    else:
        item2 = "water"

    if item1 == "bleach" and item2 == "bleach":
        prod = "Super Bleach"
    elif item1 == "bleach" and item2 == "salt":
        prod = "Redneck's Weedkiller"
    elif item1 == "salt" and item2 == "salt":
        prod = "Super Salt"
    elif item1 == "bleach" and item2 == "dirt":
        prod = "Clean Dirt"
    elif item1 == "dirt" and item2 == "salt":
        prod = "Super Dirt"
    elif item1 == "bleach" and item2 == "water":
        prod = "Mystery Milk"
    elif item1 == "bleach" and item2 == "salt":
        prod = "Lake"
    elif item1 == "dirt" and item2 == "salt":
        prod = "Slug Trap"
    elif item1 == "water" and item2 == "salt":
        prod = "Salt Water"
    elif item1 == "dirt" and item2 == "water":
        prod = "Mud"
    else:
        return "<h1>Don't Mix That!</h1>" + "<h3>You exploded -trying to mix the unmixable!<h3>"
    return "<h1>Don't Mix That!</h1>" + f"<h3>You mixed <i>{item1}</i> and <i>{item2}</i>, and got <i>{prod}</i></h3>"